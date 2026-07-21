const agentScopes={
  1:'Draft and organize customer-support replies using the order details you provide.',
  2:'Create a focused research brief, comparison, or recommendation from your stated question.',
  3:'Write sales outreach messages and prospecting sequences.',
  4:'Edit or write requested content such as an article, post, or newsletter.',
  5:'Clean, structure, or classify business data.',
  6:'Turn meeting information into decisions, notes, and action items.',
  101:'Resolve routine support tasks within the stated support rules.',
  201:'Draft inbox replies and organize messages by priority.',
  202:'Create meeting minutes, owners, and follow-up actions.',
  203:'Create social posts and content plans from your brief.',
  204:'Clean and organize spreadsheet data and formulas.',
  205:'Improve a résumé or job-application materials.'
};
const taskUnsafe=/\b(jailbreak|ignore (all|previous|your) instructions|reveal (your|the) prompt|system prompt|how are you|tell me a joke|casual chat)\b/i;
const guardedOpenHire=openHire;openHire=()=>{guardedOpenHire();const scope=agentScopes[activeAgent?.id]||'Complete the defined package task only.';const label=document.querySelector('label[for="task-brief"]');if(label)label.textContent='Describe the work you need completed';const box=document.querySelector('#task-brief');box.placeholder='Describe the specific outcome, context, and any files or requirements.';let scopeCard=document.querySelector('#task-scope');if(!scopeCard){scopeCard=document.createElement('section');scopeCard.id='task-scope';scopeCard.className='task-scope';box.insertAdjacentElement('beforebegin',scopeCard)}scopeCard.innerHTML=`<strong>${activeAgent.name} only accepts this kind of work</strong><p>${agentScopes[activeAgent.id]||'Complete the defined package task only.'}</p><p class="task-only-note"><b>Task-only agent:</b> no casual conversation, hidden-prompt requests, or unrelated work.</p>`};
document.addEventListener('click',event=>{const button=event.target.closest('button');if(!button||button.id!=='confirm-hire')return;const task=document.querySelector('#task-brief')?.value.trim()||'';if(task.length<12||taskUnsafe.test(task)){event.preventDefault();event.stopImmediatePropagation();toast(taskUnsafe.test(task)?'This agent only accepts a real task request, not casual chat or instruction overrides.':'Please describe a specific task with enough detail.');document.querySelector('#task-brief')?.focus()}},true);
