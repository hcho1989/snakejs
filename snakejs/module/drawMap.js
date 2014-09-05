define(function(){
	return {
		mapSelector:".snake",
		rowNo:30,
		columnNo:30,

		onBeforeLoad:function(){
			console.log("beforeDrawMap");
		},
		load:function(snake){
			$.extend(this,snake.config.drawMap);
			console.log(snake);
		},
		onAfterLoad:function(){
			console.log("afterDrawMap");
		}

	};
});