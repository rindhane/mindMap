
let level_record= [];
let id_counter = 0;
node_record={};

function gap (){
	return 20;
};

function get_back() {
	back=document.getElementById('background');
	return back;
};
function get_div(node) {
	elem=document.getElementById(node.id);
	return elem.parentNode;
};

function create_base_node(idx,level) {
	this.id=idx;
	this.level= level;
	this.title="id="+idx+"|" +"level="+level;
	this.children=[];
	this.parent_=null;
	this.box=null;
	this.top=0;
	this.left=0;
	this.size=30;
	this.getBottom = function() {
		return this.top + this.size;
	};
	confirm_node(this);

};
function create_child(node){	
	let child= new create_base_node(id_counter,node.level+1);
	node.children.push(child.id);
	child.parent_=node.id;
	child.top=node.getBottom() + gap();
	child.box=generate_box(get_div(node),child);//check why it doesn't work?
	svg_div=svg_path(node,child)
	child.box.appendChild(svg_div);
	return child
};

function start() { 
	let node_zero = new create_base_node(id_counter,0);
	back=get_back();
	set_background(back);
	generate_box(back,node_zero);
}; 



function demo(str) {
	let node= node_record[id_counter-1] ;
	let child = create_child (node);

};


function generate_adder() {
	let adder=document.createElement("adder");	
	adder.style.width = '10px';
	adder.style.height = '10px';
	adder.style.position='absolute';
	adder.style.background='white';
	adder.style.top = '0px';
	adder.style.left= '20px';
	adder.style.display='none';
	adder.appendChild(generate_svg());
	return adder;
};

function getParentContainer(node) {
	if (node.parent_!=null) {
	idx=node_record[node.parent_].id;
	return document.getElementById(idx).parentNode;
	}else {
		return get_back();	
	};
};


function create_container(node) {
	let container = document.createElement("container");
	container.setAttribute("id","c"+node.id);
	container.style.width ='60px';
	container.style.height= '80px';
	container.style.position = 'absolute';
	a=getParentContainer(node);
	let gap = 10 ;
	//let right = $(a).offset().left + $(a).width() ;
	//let bottom = $(a).offset().top + $(a).height();
	container.style.top = $(a).height() +gap + 'px';
	container.style.left= $(a).width() + gap + "px";
	//container.style.background="green";
	//container.style.display="none";
	return container;

};

function generate_box(div,node)  {
	let node_box = document.createElement("node");
	node_box.setAttribute("id",node.id);
	style_box(node_box,node);
	let title= document.createTextNode(node.title);
	node_box.appendChild(title);
	node_box.appendChild(generate_adder());
	node_box.onmouseover=function() {mouseOver(this)};
	node_box.onmouseout=function() {mouseOut(this)};
	container=create_container(node);
	container.appendChild(node_box);
	div.appendChild(container);
	container=dragEnable(container);
	return node_box;
};


function style_box(obj,node)
{
	obj.style.width = '20px';
	obj.style.height = node.size-20 +'px';
	obj.style.position='absolute';
	obj.style.background='red';
	obj.style.top = 5 + 'px';
	obj.style.left= 5 + 'px';
	obj.style.fontSize = 'xx-small';
};

function set_background(obj)
{
	obj.style.width = '30px';
	obj.style.height = '50px';
	obj.style.position='relative';
	obj.style.background='yellow';
};

function confirm_node(node) {
	if (node.level >= level_record.length) 
	{
		if (node.level !=0) 
		{
		level_record.push([]);
		store_node(node);
		}else {
			store_node(node);
		};
	}else {
		store_node(node);
		};
;	
	id_counter+=1;
};

function store_node(node) {
	if (node.level ==0) 
	{
		level_record.push(node.id);
	}else {
		level_record[node.level].push(node.id)
	};
	node_record[node.id]=node;
		
};



function new_function() {
	window.print(5+6);

}

function mouseOver(par) {
	par.childNodes[1].style.display='block';

};

function mouseOut(par) {
	par.childNodes[1].style.display="none";
};

function Add_click() {
	let move=80;
	box=this.parentNode.parentNode;
	idx=box.getAttribute("id");
	node=node_record[idx];
	child=create_child(node);
	//child.box.style.left=child.level*move+"px";
	//child.box.style.top=(level_record[child.level].length-1)*30+"px";
};

function dragEnable(obj) {
	//obj.setAttribute("draggable","true");
	//obj.ondragend=dragEnd;
	//obj.ondrag=function() {dragging(event,this)};
	function dragStart(event) {
		event.preventDefault();
		event.dataTransfer.setData("Text", event.target.id);
	};
	function dragging(event) {
		obj=this;
		idx=parseInt($(this).attr("id").replace("c",""),10);
		if (idx!=0) {
		child=node_record[idx];
		child_=$("#"+child.id);
		svg=$(child_).
			children("div.svg_container").
			children("svg")[0];
		svg.setAttribute("transform",svg_translate(child));
		path=$(svg).children("path")[0];
		path.setAttribute("d",get_dString(child));};
		//event.preventDefault();
		//obj.style.top = event.clientY + 'px';
		//obj.style.left= event.clientX + 'px';
	};
	function dragEnd(ove) {
	obj=this;
	event.preventDefault();
	obj.style.top = ove.clientY + 'px';
	obj.style.left= ove.clientX + 'px';
	};
	idx=obj.getAttribute("id");
	idx="#"+idx;
	$(idx).draggable({
		drag : dragging});
	return obj;
};


function generate_svg() {	
	let svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
	svg.setAttribute("class", "bi bi-plus-circle-fill");
	svg.setAttribute("width","1em");
	svg.setAttribute("height","1em");
	svg.setAttribute("viewBox", "0 0 16 16");
	svg.setAttribute("fill","currentColor");
	let path = document.createElementNS("http://www.w3.org/2000/svg","path");
	path.setAttribute("fill-rule","evenodd");
	path.setAttribute("d", "M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z");
	path.setAttribute("clip-rule","evenodd");
	svg.addEventListener("click",Add_click);
	svg.appendChild(path);
	return svg;
};

function get_dString(child) {
	child_=$("#"+child.id);
	let string = "";
	if (child_.attr("id")==0) {
		return string;
	};
	//x,y co-ordinate ref origin is screen left edge's top end
	//assume regular fourth quadrant with y as as positive 
	//then that is your screen's xy co-ordinate axis +ve directions.
	let origin_x=0;
	let origin_y=0;
	parent_=$(child_.parent().siblings().first());
	let start_y=origin_y+parent_.height()/2;
	let start_x=origin_x+parent_.width();
	let end_x=child_.offset().left-parent_.offset().left;
	let end_y=child_.offset().top-parent_.offset().top+child_.height()/2;
	let tangent_x=(start_x+end_x)/2;
	let tangent_y=(start_y+end_y)/2;
	string = string + 
		"M " + start_x+ " " + start_y +
		" C "+ tangent_x + " " + tangent_y + 
		", " + tangent_x + " " + tangent_y+
		", " + end_x + " " + end_y ;
	return string;
};


function originCorrection_svg(child) {
	let child_=$("#"+child.id);
	let parent_=$(child_.parent().siblings().first());
	let end_x=child_.offset().left-parent_.offset().left;
	let end_y=child_.offset().top-parent_.offset().top+child_.height();
	return {"left":-end_x,"top":-end_y};
};

function svg_translate(child) {
	corr=originCorrection_svg(child);
	return "translate("+corr.left+" , "+corr.top +")";
};

function svg_path(node,child) {
	let svg=document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width",500);
	svg.setAttribute("height",500);
	svg.setAttribute("transform",svg_translate(child));
	//svg.setAttribute("viewBox","-250, -250, 500, 700");
	let path=document.createElementNS("http://www.w3.org/2000/svg","path");
	path.setAttribute("d", get_dString(child));
		//"M 10 10 C 20 20, 40 20, 50 10");
	path.setAttribute("stroke","black");
	path.setAttribute("fill","transparent");
	svg.appendChild(path);
	let div=document.createElement("div");
	div.setAttribute("class", "svg_container");
	div.style.position="absolute";
	div.style.zIndex="-1";
	div.appendChild(svg);
	return div;
};

