/* Kobits website widget - private beta. Add with a data-kobits-endpoint attribute. */
(() => {
  const script = document.currentScript;
  const endpoint = String(script?.dataset.kobitsEndpoint || '').replace(/\/$/, '');
  if (!endpoint) return console.warn('Kobits widget needs data-kobits-endpoint="https://your-kobits-site".');

  const host = document.createElement('div');
  host.setAttribute('aria-live', 'polite');
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `<style>:host{all:initial}.kobits-launch{position:fixed;right:20px;bottom:20px;z-index:2147483646;border:0;border-radius:999px;background:#0d5b50;color:#fff;padding:13px 16px;font:700 13px system-ui,-apple-system,"Segoe UI",sans-serif;box-shadow:0 8px 20px #17201e2d;cursor:pointer}.kobits-panel{position:fixed;right:20px;bottom:75px;z-index:2147483646;width:min(350px,calc(100vw - 40px));border:1px solid #e5e8e6;border-radius:17px;background:#fbfcfb;color:#17201e;box-shadow:0 18px 45px #17201e2d;padding:16px;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;display:none}.kobits-panel.open{display:block}.kobits-head{display:flex;justify-content:space-between;align-items:center}.kobits-head strong{font-size:16px;letter-spacing:-.4px}.kobits-head em{font-family:Georgia,serif;font-weight:400}.kobits-close{border:0;background:none;font-size:20px;color:#69736f;cursor:pointer}.kobits-panel p{font-size:12px;line-height:1.45;color:#69736f;margin:8px 0 14px}.kobits-panel label{display:block;font-size:11px;font-weight:750;margin:12px 0 6px}.kobits-panel select,.kobits-panel textarea{box-sizing:border-box;width:100%;border:1px solid #e5e8e6;border-radius:9px;background:#fff;color:#17201e;padding:10px;font:12px system-ui,-apple-system,"Segoe UI",sans-serif}.kobits-panel textarea{min-height:85px;resize:vertical}.kobits-run{display:flex;justify-content:space-between;align-items:center;width:100%;height:42px;margin-top:12px;border:0;border-radius:9px;background:#0d5b50;color:#fff;padding:0 12px;font:700 12px system-ui,-apple-system,"Segoe UI",sans-serif;cursor:pointer}.kobits-run:disabled{opacity:.65}.kobits-output{display:none;margin-top:12px;border-radius:10px;background:#e7f1ee;padding:10px;white-space:pre-wrap;font-size:11px;line-height:1.45}.kobits-output.show{display:block}.kobits-output.error{background:#f2ede4}</style><button class="kobits-launch" type="button">Ask Kobits</button><section class="kobits-panel" role="dialog" aria-label="Kobits agent"><div class="kobits-head"><strong>Ask <em>Kobits</em></strong><button class="kobits-close" type="button" aria-label="Close">×</button></div><p>Describe one clear task. A person reviews the result before any outside action.</p><label>Agent<select class="kobits-agent"><option value="1">Support Desk</option><option value="2">Research Sprint</option><option value="4">Content Editor</option></select></label><label>What do you need?<textarea class="kobits-brief" maxlength="4000" placeholder="Describe the outcome and useful context."></textarea></label><button class="kobits-run" type="button">Run agent <span>→</span></button><div class="kobits-output"></div></section>`;
  document.body.append(host);

  const panel = root.querySelector('.kobits-panel');
  const output = root.querySelector('.kobits-output');
  const show = (message, error = false) => { output.textContent = message; output.classList.add('show'); output.classList.toggle('error', error); };
  root.querySelector('.kobits-launch').addEventListener('click', () => panel.classList.toggle('open'));
  root.querySelector('.kobits-close').addEventListener('click', () => panel.classList.remove('open'));
  root.querySelector('.kobits-run').addEventListener('click', async () => {
    const brief = root.querySelector('.kobits-brief').value.trim();
    if (brief.length < 12) return show('Please describe one specific task first.', true);
    const button = root.querySelector('.kobits-run');
    button.disabled = true;
    button.textContent = 'Running agent…';
    try {
      const response = await fetch(`${endpoint}/api/run-agent`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ agentId: Number(root.querySelector('.kobits-agent').value), brief, tier: 'Website widget' }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'The agent could not complete this task.');
      show(data.delivery);
    } catch (error) { show(error.message || 'Could not reach Kobits.', true); }
    finally { button.disabled = false; button.innerHTML = 'Run agent <span>→</span>'; }
  });
})();
