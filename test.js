const Leaf = () => ({});
const Tree = (...children) => ({ children });

const countLeaves = tree => (
	tree.children ? 
		tree.children.reduce(
            ((a, b) => a + countLeaves(b)), 0
        ) : 1
); 

const sapling = Tree(Leaf()); 

const res = countLeaves(sapling); 
console.log(res); 
// => 1

const tree = Tree(
    Tree(
        Leaf(), Leaf()
    ),
    Tree(
        Tree(
            Leaf()
        ),
        Tree(
            Leaf(), Leaf()
        ),
        Leaf()
    )
);

console.log(countLeaves(tree));
// => 6

[
    {
        "type": "</>",
        "lang": "js"
    },
    "console.log('!');",
    {
        "type": "</>",
        "lang": ""
    },
    "",
    {
        "type": "*",
        "block": [
            "1",
            "2",
            "3"
        ]
    },
    "",
    {
        "type": ">",
        "block": [
            "1",
            {
                "type": ">",
                "block": [
                    "2",
                    {
                        "type": ">",
                        "block": [
                            "3"
                        ]
                    }
                ]
            },
            {
                "type": 0,
                "block": [
                    "一行",
                    "两行",
                    "三行"
                ]
            }
        ]
    },
    "",
    {
        "type": 0,
        "block": [
            "a",
            "b",
            "c"
        ]
    },
    ""
]