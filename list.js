
/*i = new Object();

i["hello"] = "world";
i.s = "javascript";

function is_element(obj, key)
{
	ele = obj[key];
	if (typeof ele != "undefined")
	{
		alert("yes");
	}
	else
	{
		alert("no");
	}
}

is_element(i, "hello");
is_element(i, "key");

alert(i["hello"]);
alert(i.s);
alert(i["key"]);
alert(typeof i["key"]);
alert(typeof typeof i["key"]);*/

//jobj = {
//	"hello" : "world", 
//	jibril : 6407
//};

database = {
	name : "database", 
	blogs : [], 
	children : [{
			name : "redis", 
			blogs : []
		}, {
			name : "mysql", 
			blogs : []
		}
	]
};

tech_tree = {
	name : "tech tree", 
	blogs : [], 
	children : [database]
};

function render_cb(obj, offx, offy, level)
{
	// TODO set html item position
}

function update_render()
{
	canvas = document.getElementById("canvas");
	render_group_tree(tech_tree, canvas.width / 2, canvas.height / 2, 0, render_cb);
	setTimeout("update_render()", 20);
}

function init_html_elements(parent_node, rdobj)
{
	rdobj.html_element = parent_node.createElement("xxx");
	if (typeof rdobj.children != "undefined")
	{
		for (var i = 0; i < rdobj.children.length; ++i)
		{
			init_html_elements(rdobj.html_element, rdobj.children[i]);
		}
	}
}

function init()
{
	init_rdobj(tech_tree, 20);
	init_html_elements(document.getElementById("canvas"), tech_tree);
	
	setTimeout("update_render()", 20);
}
