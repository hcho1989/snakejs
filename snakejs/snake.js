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
        status: "",
        modules:[],
        
        modulesLoaded:{},
        
        onBeforeInit:function(){console.log("beforeInit");},
        onAfterInit:function(){console.log("afterInit");},
        
        init:function(config){
            if($.type(config) ==="object")
            {
                delete config.init;
                $.extend(this,config);
            }
            
            this.onBeforeInit();
            for(var i=0;i<this.modules.length;i++)
            {
                if(typeof this.moduleLoaded[this.modules[i]] == "undefined")
                    this.modulesLoaded[this.modules[i]] = loadModule(this.modules[i]);
            }
            this.onAfterInit();
        },
        
        
        loadModule:function(name){
            var _this = this;
            return require('module/'+name,function(m){
                m.onBeforeLoad();
                m.load(_this);
                m.onAfterLoad();
            });
        },
    };
    
});
