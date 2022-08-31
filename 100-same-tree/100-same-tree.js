/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
  
  const queue = [[p, q]];
  
  let isSame = true;
  while (queue.length > 0) {
    const [pNode, qNode] = queue.shift();
    if (!pNode && !qNode) continue;
    
    if (pNode?.val !== qNode?.val) {
      isSame = false;
      break;
    }
    
    queue.push([pNode?.left, qNode?.left]);    
    queue.push([pNode?.right, qNode?.right]);
  }
  
  return isSame;
};