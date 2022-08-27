/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} original
 * @param {TreeNode} cloned
 * @param {TreeNode} target
 * @return {TreeNode}
 */

var getTargetCopy = function(original, cloned, target) {
  let clonedTarget = null;
  const dfs = (start) => {
    if (start.val === target.val) {
        clonedTarget = start;
        return;
    }
    
    if (start.left) dfs(start.left);
    if (start.right) dfs(start.right);
  };
  
  dfs(cloned);
  
  return clonedTarget;
};