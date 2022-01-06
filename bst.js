const {Node} = require('./node');

class BinarySearchTree {
    
    constructor() {
        // root of a binary search tree
        this.root = null;
    }

    insert(data)
    {
        var newNode = new Node(data);
        if(this.root === null)
            this.root = newNode;
        else
            this.insertNode(this.root, newNode);
    }
    
    insertNode(node, newNode)
    {
        const Node = require('./node');
        if(newNode.data < node.data)
        {
            if(node.left === null)
            {
                node.left = newNode;
                node.left.parent = node;
            }
            else
                this.insertNode(node.left, newNode);
        }
        else
        {
            if(node.right === null)
            {
                node.right = newNode;
                node.right.parent = node;
            }
            else
     
                this.insertNode(node.right,newNode);
        }
    }
    

    remove(data)
    {
        this.root = this.removeNode(this.root, data);
    }
     
    removeNode(node, key)
    {
        var tempNode = new Node();     
        if(node === null)
            return null;
     
        else if(key < node.data)
        {
            node.left = this.removeNode(node.left, key);
            return node;
        }
     
        else if(key > node.data)
        {
            node.right = this.removeNode(node.right, key);
            return node;
        }
     
        else
        {
            if(node.left === null && node.right === null)
            {
                node = null;
                return node;
            }
     
            if(node.left === null)
            {
                tempNode = node;
                node = node.right;
                node.parent = tempNode.parent;
                return node;
            }
             
            else if(node.right === null)
            {
                tempNode = node;
                node = node.left;
                node.parent = tempNode.parent;
                return node;
            }
     
            var aux = this.findMinNode(node.right);
            node.data = aux.data;
     
            node.right = this.removeNode(node.right, aux.data);
            return node;
        }
     
    }
     
    // Performs inorder traversal of a tree
    inorder(node)
    {
        if(node !== null)
        {
            var toPrint;
            this.inorder(node.left);
            toPrint = node.data+" ";
            if(node.parent!== null) toPrint += "parent => " + node.parent.data;
            else toPrint += "parent => null";
            console.log(toPrint);
            this.inorder(node.right);
        }
    }
    
    // Performs preorder traversal of a tree   
    preorder(node)
    {
        if(node !== null)
        {   
            var toPrint;
            toPrint = node.data+" ";
            if(node.parent!== null) toPrint += "parent => " + node.parent.data;
            else toPrint += "parent => null";
            console.log(toPrint);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }
        
    // Performs postorder traversal of a tree
    postorder(node)
    {
        if(node !== null)
        {
            this.postorder(node.left);
            this.postorder(node.right);
            var toPrint;
            toPrint = node.data+" ";
            if(node.parent!== null) toPrint += "parent => " + node.parent.data;
            else toPrint += "parent => null";
            console.log(toPrint);
        }
    }
    
        
    //  finds the minimum node in tree, searching starts from given node
    findMinNode(node)
    {
        if(node.left === null)
            return node;
        else
            return this.findMinNode(node.left);
    }
    
    // returns root of the tree
    getRootNode()
    {
        return this.root;
    }
    
    // search for a node with given data
    search(node, data)
    {
        if(node === null)
            return null;
    
        // if data is less than node's data move left
        else if(data < node.data)
            return this.search(node.left, data);
    
        // if data is greater than node's data move right
        else if(data > node.data)
            return this.search(node.right, data);
    
        // if data is equal to the node data return node
        else
            return node;
    }

    completeTree(h) {
        var completeBST = new BinarySearchTree();
        completeBST.insert(1);
        this.completeTreeHelper(completeBST.getRootNode(), 1, h);
        h = this.height;
        return completeBST.getRootNode();
    }

    completeTreeHelper(node, parentData, h){
        if (parentData >= h) return;
        var nodeleft = new Node;
        node.left = nodeleft;
        nodeleft.data = "  ";
        nodeleft.parent = node;
        this.completeTreeHelper(nodeleft, parentData+1, h);
        var noderight = new Node;
        node.right = noderight;
        noderight.data = "  ";
        noderight.parent = node;
        this.completeTreeHelper(noderight, parentData+1, h);
    }

    printLevelOrder(root){
        var node = this.LevelOrder(root);
        var h = this.height(node);
        var queue = [[]];
        var data;
        queue[0].push(node.data);
        for(let i = 1; i < h ; i++){
            queue[i]=[];
            data = this.getNodeToPrint(queue[i], node.left, 1, i);
            if (data!== null) queue[i].push(data);
            
            data = this.getNodeToPrint(queue[i], node.right, 1, i);
            if (data!== null) queue[i].push(data);
        }

        for(let i = 0; i < h-1 ; i++){
            console.log(this.display2Digits(queue[i],h));
            this.displayBranches(queue[i],queue[i+1], h);
        }
        console.log(this.display2Digits(queue[h-1],h));
    }


    getNodeToPrint(queue, node, level, h){
        var data;
        if( node.left == null && node.right == null || level >= h) return node.data;
        data = this.getNodeToPrint(queue, node.left, level+1, h);
        if (data!== null) queue.push(data);
        data = this.getNodeToPrint(queue, node.right, level+1, h);
        if (data!== null) queue.push(data);
        return null;
    }

    LevelOrder(root) {
        var h = this.height(root);
        var node = this.completeTree(h);
        var i;
        for (i = 1; i <= h; i++)
            this.CurrentLevel(root, node, i);
        return node;
    }

    CurrentLevel(root , node, level) {
        if (root == null)
            return;
        if (level == 1)
            node.data = root.data;
        else if (level > 1) {
            this.CurrentLevel(root.left, node.left, level - 1);
            this.CurrentLevel(root.right, node.right, level - 1);
        }
    }

    spaces(numSpaces)
    {
        var spc = ""
        for (var i = 0 ; i < numSpaces ; i++) {
            spc += " ";
        }
        return spc;
    }

    display2Digits(nodeList, treeHeight){
        var p = treeHeight-Math.log(nodeList.length)/Math.log(2);
        var n =Math.pow(2,p)-2;
        var toPrint = this.spaces(n);
        for (var i = 0; i < nodeList.length ; i++){
            if(nodeList[i] == null || nodeList[i] == "") nodeList[i] = "  ";
            toPrint += this.complete2Digits(nodeList[i]);
            if ( i < nodeList.length-1) toPrint +=  this.spaces(Math.pow(2,p+1)-2);
        }
        return toPrint;
    }

    displayBranches(nodeList1, nodeList2, treeHeight){
        let p = treeHeight-Math.log(nodeList1.length)/Math.log(2);
        let n =Math.pow(2,p)-2;                                   
        let m =Math.pow(2,p-1);                                   
        for (let i = 0; i < m ; i++){
            let toPrint = "";
            for (let j = 0; j < nodeList1.length; j++){
                let bracketL = "";
                let bracketR = "";
                if (nodeList2[2*j] == "  ") bracketL = " ";
                else bracketL = "/";
                if (nodeList2[2*j+1] == "  ") bracketR = " ";
                else bracketR = "\\";
                toPrint = toPrint+this.spaces(n-i)+bracketL+this.spaces(2*i)+bracketR;
                if (j < nodeList1.length-1) toPrint += this.spaces(Math.pow(2,p)-i);
            }
            console.log(toPrint);
        }
        return;

    }

    complete2Digits(num){
        if(num < 10 && num >= 0 && num !== "  "){
            return " "+ num;
            console.log("num +> "+num);
        }
        return num;
    }


    // returns the height of a node in a given tree
    height(root)
    {
        if (root == null)
            return 0;
        else {
            var lheight = this.height(root.left);
            var rheight = this.height(root.right);
 
            if (lheight > rheight)
                return (lheight + 1);
            else
                return (rheight + 1);
        }
    }

    applyItem(lists, x, arrays){
        for (var i = 0; i < arrays.length ; i++){
            arrays[i].unshift(x)
            if(lists[0]=="")
                lists[0] = arrays[i];
            else
                lists.push(arrays[i].unshift(x));
        }
        return lists;
    }

    allSequences(node){
        var results = [[]];
        var leftSeq = [[]];
        var rightSeq = [[]];

        if (node == null){
            return results;
        }
        var prefix = [node.data];

        leftSeq = this.allSequences(node.left);
        rightSeq = this.allSequences(node.right);

        for (let i = 0 ; i < leftSeq.length ; i++){
            for (let j = 0 ; j < rightSeq.length ; j++){
                this.weaveList(prefix, leftSeq[i], rightSeq[j], results);
            }
        }
        return results;
    }

    weaveList(prefix, aFirst, aSecond, results){
        let result = [];
        if(aFirst.length==0 || aSecond.length == 0){
            result.push(...prefix);
            result.push(...aFirst);
            result.push(...aSecond);
            if(results[0]=="") results[0] = result;
            else results.push(result);
            return result;
        }
        var headFirst = aFirst[0]
        aFirst.shift();
        prefix.push(headFirst);
        this.weaveList(prefix, aFirst, aSecond, results);
        prefix.pop();
        aFirst.unshift(headFirst);

        var headSecond = aSecond[0]
        aSecond.shift();
        prefix.push(headSecond);
        this.weaveList(prefix, aFirst, aSecond, results);
        prefix.pop();
        aSecond.unshift(headSecond);
    }

}

exports.BinarySearchTree = BinarySearchTree; 

var BST = new BinarySearchTree();
var results= [[]];
BST.insert(50);
BST.insert(20);
BST.insert(60);
BST.insert(10);
BST.insert(25);
BST.insert(70);
// BST.insert(5);
// BST.insert(15);
// BST.insert(65);
// BST.insert(80);
var root = BST.getRootNode();
BST.printLevelOrder(root);
console.log();
results = BST.allSequences(root);
var data = 2;
console.log(module);