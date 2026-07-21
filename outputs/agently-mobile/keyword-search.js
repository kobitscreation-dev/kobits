const keywordMap={
  1:['support','customer','customers','help desk','reply','replies','refund','returns','order','orders'],
  2:['research','researcher','market','competitor','competitors','idea','ideas','analysis','report','find information'],
  3:['sales','sell','selling','outreach','prospect','prospects','lead','leads','cold email','pipeline'],
  4:['content','blog','article','newsletter','copy','writing','writer'],
  5:['data','database','crm','records','cleanup','clean data'],
  6:['meeting','meetings','minutes','notes','action items','follow up','follow-up'],
  201:['email','emails','inbox','reply email','customer email','messages','message','inbox zero'],
  202:['meeting','meetings','minutes','meeting notes','action items','follow up','follow-up','summary'],
  203:['social','social media','instagram','linkedin','twitter','x post','posts','content ideas'],
  204:['excel','spreadsheet','sheets','csv','formula','formulas','data cleanup'],
  205:['resume','résumé','cv','job','jobs','application','cover letter','interview']
};
function normalizedSearch(value){return value.toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim()}
function keywordScore(agent,query){const words=normalizedSearch(query),terms=[agent.name,agent.category,agent.description,agent.listingTitle,...(keywordMap[agent.id]||[])].join(' ').toLowerCase();let score=0;if(terms.includes(words))score+=8;words.split(' ').forEach(word=>{if(word.length>1&&terms.includes(word))score+=2});return score}
const keywordFiltered=filtered;filtered=()=>{const query=document.querySelector('#search-input').value.trim();if(!query)return keywordFiltered();const direct=keywordFiltered();const pool=agents.filter(a=>a.active!==false&&(selectedCategory==='All'||a.category===selectedCategory)&&(priceFilter==='any'||priceFilter==='under-100'&&a.tiers[0].price<30||priceFilter==='100-300'&&a.tiers[0].price>=30&&a.tiers[0].price<=50||priceFilter==='300-plus'&&a.tiers[0].price>50)&&(ratingFilter==='any'||a.rating>=Number(ratingFilter)));return pool.map(a=>({a,score:keywordScore(a,query)})).filter(x=>x.score>0||direct.includes(x.a)).sort((x,y)=>y.score-x.score||y.a.rating-x.a.rating).map(x=>x.a)};
const keywordRender=renderSearch;renderSearch=()=>{keywordRender();const input=document.querySelector('#search-input');input.placeholder='Try “meeting notes” or “reply to emails”';let hint=document.querySelector('#keyword-hint');if(!hint){hint=document.createElement('p');hint.id='keyword-hint';hint.className='keyword-hint';input.closest('.search-input').insertAdjacentElement('afterend',hint)}const q=input.value.trim();hint.innerHTML=q?`Showing agents that match <strong>“${q.replace(/[<>]/g,'')}”</strong>`:'Try keywords: inbox, meeting notes, Excel, content, résumé, research.'};
document.querySelector('#search-input').addEventListener('input',()=>renderSearch());
renderSearch();
