
/**
 * function json2rdobj(json, max_radius, init_func);
 * function render_group_tree(rdobj, offx, offy, level, render_func);
**/

function zero_pos_delta(obj)
{
	obj.dx = 0;
	obj.dy = 0;
}

function cal_pos_delta(obj1, obj2)
{
	dx = obj1.x - obj2.x;
	dy = obj1.y - obj2.y;
	
	sq = dx * dx + dy * dy;
	accl = 1 / (sq * Math.sqrt(sq));
	
	dx *= accl;
	dy *= accl;
	
	obj1.dx += dx;
	obj1.dy += dy;
	
	obj2.dx -= dx;
	obj2.dy -= dy;
}

function update_obj_pos(obj, r)
{
	x = obj.x + obj.dx;
	y = obj.y + obj.dy;
	s = r / Math.sqrt(x * x + y * y);
	obj.x = x * s;
	obj.y = y * s;
}

function update_obj_group(group, r)
{
	for (var i = 0; i < group.length; ++i)
	{
		zero_pos_delta(group[i]);
	}
	for (var i = 1; i < group.length; ++i)
	{
		for (var j = 0; j < i; ++j)
		{
			cal_pos_delta(group[0], group[1]);
		}
	}
	for (var i = 0; i < group.length; ++i)
	{
		update_obj_pos(group[i], r);
	}
}

function render_obj(obj, offx, offy, level, render_func)
{
	render_func(obj, offx, offy, level);
}

function init_single_rdobj(rdobj, r)
{
	rdobj.children = new Array();
	rdobj.r = r;
	rdobj.dx = 0;
	rdobj.dy = 0;
	
	x = Math.random() + 1;
	y = Math.random() + 1;
	s = r / Math.sqrt(x * x + y * y);
	rdobj.x = s * x;
	rdobj.y = s * y;
}

/**
 * struct rdobj
 * 	children
 * 	x, y, r
 * 	dx, dy
**/
/**
 * json 
 * 	childern : [
 * 		{}, {}, ...
 * 	]
**/
function init_rdobj(rdobj, max_radius)
{
	init_single_rdobj(rdobj, max_radius);
	
	children = json.children;
	if (typeof children != "undefined")
	{
		for (var i  0; i < children.length; ++i)
		{
			init_rdobj(children[i], max_radius * 0.7);
		}
	}
}

function render_group_tree(rdobj, offx, offy, level, render_func)
{
	render_obj(rdobj, offx, offy, level, render_func);
	for (var i = 0; i < rdobj.children.length; ++i)
	{
		child_list = rdobj.children[i];
		update_obj_group(child_list, rdobj.r);
		render_group_tree(child_list, rdobj.x + offx, rdobj.y + offy, level + 1, render_func);
	}
}
