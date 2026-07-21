const $ = (selector) => document.querySelector(selector);
const agentNames = { 2: 'Research Sprint', 4: 'Content Editor', 208: 'PlainSpeak', 209: 'Code Check' };

function show(message, error = false) {
  const result = $('#result');
  result.textContent = message;
  result.classList.add('show');
  result.classList.toggle('error', error);
}

function normaliseServer(value) {
  const url = new URL(value.trim());
  if (url.protocol !== 'https:') throw new Error('Use an https:// Kobits website URL.');
  return url.origin;
}

async function connection() {
  const state = await chrome.storage.sync.get({ serverUrl: '' });
  if (!state.serverUrl) throw new Error('Add your Kobits website URL in Connection settings first.');
  const server = normaliseServer(state.serverUrl);
  const allowed = await chrome.permissions.contains({ origins: [`${server}/*`] });
  if (!allowed) throw new Error('Open Connection settings and allow access to your Kobits website first.');
  return server;
}

async function selectedContext() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) throw new Error('No active webpage found.');
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => ({ title: document.title, url: location.href, selection: String(window.getSelection() || '').trim().slice(0, 6000) })
  });
  if (!result?.selection) throw new Error('Select useful text on the webpage first, then try again.');
  return result;
}

$('#capture').addEventListener('click', async () => {
  try {
    const context = await selectedContext();
    $('#brief').value = `Page: ${context.title}\nURL: ${context.url}\n\nSelected text:\n${context.selection}\n\nTask: `;
    show('Page text added. Finish the task after “Task:”.');
  } catch (error) { show(error.message, true); }
});

$('#save-settings').addEventListener('click', async () => {
  try {
    const serverUrl = normaliseServer($('#server-url').value);
    const allowed = await chrome.permissions.request({ origins: [`${serverUrl}/*`] });
    if (!allowed) throw new Error('Allow access to your Kobits website to save this connection.');
    await chrome.storage.sync.set({ serverUrl });
    $('#server-url').value = serverUrl;
    show('Connection saved. No API key is stored in the extension.');
  } catch (error) { show(error.message, true); }
});

$('#run').addEventListener('click', async () => {
  const button = $('#run');
  const brief = $('#brief').value.trim();
  if (brief.length < 12) return show('Describe one specific task first.', true);
  button.disabled = true;
  button.textContent = 'Running agent…';
  try {
    const server = await connection();
    const agentId = Number($('#agent').value);
    const response = await fetch(`${server}/api/run-agent`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ agentId, brief, tier: 'Browser helper' }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'The agent could not run.');
    show(`${agentNames[agentId]} delivery:\n\n${data.delivery}`);
  } catch (error) { show(error.message || 'Could not run the agent.', true); }
  finally { button.disabled = false; button.innerHTML = 'Run agent <span>→</span>'; }
});

chrome.storage.sync.get({ serverUrl: '' }).then(({ serverUrl }) => { $('#server-url').value = serverUrl; });
