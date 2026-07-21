/* Adjust these inputs when your real AI, search, hosting, or payment costs change. */
const kobitsPricing={targetNetProfit:.05,cardRate:.029,cardFixed:.30};
function minimumSustainablePrice(variableCost){return Math.ceil(((variableCost+kobitsPricing.cardFixed)/(1-kobitsPricing.cardRate-kobitsPricing.targetNetProfit))*100)/100}
function affordablePrice(variableCost,marketFloor){return Math.max(marketFloor,minimumSustainablePrice(variableCost))}
const affordablePackages={
  1:[3.99,6.99,10.99],
  2:[2.99,5.99,9.99],
  3:[4.99,8.99,13.99],
  4:[3.99,6.99,10.99],
  5:[3.99,6.99,10.99],
  6:[1.99,3.99,6.99],
  101:[3.99,6.99,10.99]
};
agents.forEach(agent=>{const prices=affordablePackages[agent.id];if(!prices)return;agent.tiers=agent.tiers.map((tier,index)=>({...tier,price:prices[index]}));agent.price=prices[0]});
save();renderHome();renderSearch();if(typeof renderSavedAgents==='function')renderSavedAgents();
