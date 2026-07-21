/* A premium path from one-off agent orders to trusted team workflows. */
(() => {
  const fp = (selector) => document.querySelector(selector);
  let workspace = { connected: [], selectedWorkflow: '', reviewed: false };
  try { workspace = { ...workspace, ...JSON.parse(localStorage.getItem('kobits_workspace_v2') || '{}') }; } catch {}

  const workflows = [
    { id: 'sales', title: 'Sales pipeline', copy: 'Research, personalise, and prepare CRM-ready leads.', marks: ['R', 'W', 'CRM'] },
    { id: 'support', title: 'Support resolution', copy: 'Triage questions, draft replies, and flag escalations.', marks: ['T', 'R', '✓'] },
    { id: 'content', title: 'Content engine', copy: 'Turn one idea into a plan, draft, and ready-to-post kit.', marks: ['I', 'W', 'P'] }
  ];

  function persistWorkspace() {
    try { localStorage.setItem('kobits_workspace_v2', JSON.stringify(workspace)); } catch {}
  }

  function addWorkflowSection() {
    if (fp('#workflow-section')) return;
    const featured = fp('.featured-section');
    if (!featured) return;
    featured.insertAdjacentHTML('beforebegin', `<section class="section workflow-section" id="workflow-section"><p class="workflow-kicker">FOR TEAMS</p><div class="section-heading"><h2>Ready-made workflows</h2><button class="text-button" id="open-workspace">Set up workspace</button></div><div class="workflow-scroll">${workflows.map(flow => `<button class="workflow-card" data-workflow="${flow.id}"><div class="workflow-card-top"><h3>${flow.title}</h3><div class="workflow-mark">${flow.marks.map(mark => `<i>${mark}</i>`).join('')}</div></div><p>${flow.copy}</p><small>Multi-agent workflow · Review before external actions</small></button>`).join('')}</div></section>`);
  }

  function addWorkspaceScreen() {
    if (fp('#workspace-screen')) return;
    fp('.app-shell')?.insertAdjacentHTML('beforeend', '<section id="workspace-screen" class="screen"></section>');
  }

  function addProfileEntry() {
    const group = fp('#profile-screen .settings-group');
    if (!group || fp('#open-workspace-profile')) return;
    group.insertAdjacentHTML('beforeend', '<button id="open-workspace-profile"><span>Team workspace & integrations</span><b>›</b></button>');
  }

  function selectedFlow() { return workflows.find(flow => flow.id === workspace.selectedWorkflow); }

  function renderWorkspace() {
    const screen = fp('#workspace-screen');
    if (!screen) return;
    const active = selectedFlow();
    const integrations = [
      ['Gmail', 'GM', 'Read work context and draft replies'],
      ['Slack', 'SL', 'Send approval requests to your team'],
      ['HubSpot', 'HS', 'Prepare CRM updates for review']
    ];
    screen.innerHTML = `<header class="screen-header"><button class="back" data-screen="profile-screen" aria-label="Go back">←</button><div><p class="eyebrow">KOBITS FOR TEAMS</p><h2>Workspace</h2></div><span></span></header><section class="workspace-hero"><h1>Turn agents into a <em>reliable workflow.</em></h1><p>Connect the tools where your team already works. Kobits prepares actions; your approval rules decide what happens next.</p></section><section class="future-card soft"><h2>Designed for dependable work</h2><p>Every future workflow will have clear task boundaries, reviewable activity, and an approval step before an external change.</p><div class="trust-points"><span><b>✓</b>Task boundaries</span><span><b>↗</b>Approval rules</span><span><b>≡</b>Activity log</span></div></section><section class="future-card"><h2>Connect your tools</h2><p>Demo setup only. Real connections need a secure backend and your permission.</p>${integrations.map(([name,mark,copy]) => { const connected = workspace.connected.includes(name); return `<div class="integration-row"><div class="integration-badge">${mark}</div><div class="integration-copy"><strong>${name}</strong><span>${copy}</span></div><button class="integration-action ${connected ? 'connected' : ''}" data-integration="${name}">${connected ? 'Connected' : 'Connect'}</button></div>`; }).join('')}</section><section class="future-card"><h2>Workflow setup</h2><p>Choose a workflow, then connect only the tools it needs.</p>${active ? `<p class="workflow-selected">Selected: ${active.title}</p>` : '<p class="workflow-selected">Choose a workflow from Discover to begin.</p>'}</section><section class="future-card"><h2>Review queue</h2><div class="approval-item"><div class="approval-icon">!</div><div><strong>${workspace.reviewed ? 'No actions waiting' : 'CRM update needs approval'}</strong><p>${workspace.reviewed ? 'Your approval queue is clear.' : 'A workflow would prepare the record change and wait here before sending it.'}</p>${workspace.reviewed ? '' : '<button id="approve-demo-action">Approve demo step</button>'}</div></div></section>`;
  }

  function addAgentReliability(agent) {
    const description = fp('.agent-page-copy');
    if (!description || fp('#agent-reliability')) return;
    description.insertAdjacentHTML('afterend', `<aside class="agent-reliability" id="agent-reliability"><b>✓</b><div><strong>Built for controlled work</strong><p>${agent.name} stays inside its defined task. Team work can add approval rules and a reviewable activity log before external actions.</p></div></aside>`);
  }

  function addOrdersAssurance() {
    const list = fp('#orders-list');
    if (!list || fp('#orders-assurance')) return;
    list.insertAdjacentHTML('beforebegin', '<aside class="orders-assurance" id="orders-assurance"><b>✓</b><div><strong>Orders are clear and reviewable</strong>Payments remain held until you accept delivery. Team workflows can also require approval before they update an outside tool.</div></aside>');
  }

  const previousShowScreen = showScreen;
  showScreen = (id) => {
    previousShowScreen(id);
    if (id === 'workspace-screen') renderWorkspace();
    if (id === 'work-screen') addOrdersAssurance();
  };

  const previousAgentProfile = renderAgentProfile;
  renderAgentProfile = (agent) => {
    previousAgentProfile(agent);
    addAgentReliability(agent);
  };

  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.id === 'open-workspace' || button.id === 'open-workspace-profile') showScreen('workspace-screen');
    if (button.dataset.workflow) {
      workspace.selectedWorkflow = button.dataset.workflow;
      persistWorkspace();
      showScreen('workspace-screen');
      toast('Workflow selected. Connect tools when you are ready.');
    }
    if (button.dataset.integration) {
      const name = button.dataset.integration;
      if (!workspace.connected.includes(name)) workspace.connected.push(name);
      persistWorkspace();
      renderWorkspace();
      toast(`${name} marked connected for this demo. A real connection needs secure setup.`);
    }
    if (button.id === 'approve-demo-action') {
      workspace.reviewed = true;
      persistWorkspace();
      renderWorkspace();
      toast('Demo approval recorded. No external action was sent.');
    }
  });

  addWorkflowSection();
  addWorkspaceScreen();
  addProfileEntry();
  addOrdersAssurance();
})();
