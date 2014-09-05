/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

requirejs.config({
    //By default load any module IDs from js/lib
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        lib: './lib',
        jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
        module: './module'
    }
});

// Start the main app logic.
requirejs(['jquery','require'],function ($,require) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
    
    var snake = {
        
        moduleLoaded:{},

        config:{
            modules:[],
        },
        
        onBeforeInit:function(){
            if(typeof this.config.onBeforeInit == "function")
                this.config.onBeforeInit();
        },
        onAfterInit:function(){
            if(typeof this.config.onAfterInit == "function")
                this.config.onAfterInit();
        },
        init:function(config){

            if($.type(config) ==="object")
                $.extend(this.config,config);

            this.onBeforeInit();
            for(var i=0;i<this.config.modules.length;i++)
            {
                if(typeof this.moduleLoaded[this.config.modules[i]] == "undefined")
                    this.moduleLoaded[this.config.modules[i]] = this.loadModule(this.config.modules[i]);
            }

            this.onAfterInit();
        },
        
        
        loadModule:function(name){
            var _this = this;
            require(['module/'+name],function(m){
                if(typeof _this.moduleLoaded[name] == "undefined")
                {
                    if(typeof m.onBeforeLoad == "function")
                        m.onBeforeLoad();

                    m.load(_this);

                    _this.moduleLoaded[name] = m;


                    if(typeof m.onAfterLoad == "function")
                        m.onAfterLoad();
                }
            });
        },
    };
    
    snake.init({
        modules:["drawMap"],
        drawMap:{rowNo:100}
    });

});
