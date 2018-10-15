var generatorModel = (function(){
    var data = {
        lucky: []
    };
    return {
        getData : function(){
            return data;
        },
        resetData: function(){
            data.lucky = [];
        }
    }
})();

var generatorView = (function(){
    
    var DOMStrings = {
        form         : 'lotto-form',
        button       : 'generate',
        draw         : 'lotto-draw',
        reset        : 'reset',
        holder       : 'number-holder',
        img          :  'img'
    };

    return {

        getDOMString: function(){
            return DOMStrings;
        },

        resetImages: function(data){
            var ctr = 1;
            for (let index = 0; index < data.length; index++) {
                var holder = document.querySelector('#number-holder #ball-' + ctr);
                holder.src = "LotteryBalls/Ball_t";
                ctr++;
            }
        },

        loadImages: function(data){
            this.resetImages(data);
            var ctr = 1;
            for (let index = 0; index < data.length; index++) {
                var holder = document.querySelector('#number-holder #ball-' + ctr);
                var value = "-" + data[index]+".png";
                holder.src = holder.src.replace("_t", value);
                ctr++;
            }
        },
    };
})();

var controller = (function(model, view){

    var DOMString = view.getDOMString();
    
    var SetUpEventListeners = function(){
       
        document.getElementById(DOMString.button).addEventListener('click',function(){
            var select = document.getElementById(DOMString.draw);
            var number = select.options[select.selectedIndex].value;
            generateNumbers(number);

        });
        
        document.getElementById(DOMString.form).addEventListener('submit', function(e){
            e.preventDefault();
        });

    };

    Array.prototype.contains = function(element){
        for (let i = 0; i < this.length; i++) {
            if(this[i] == element)
                return true;
        }
        return false;
    };

    var arrayContains = function(element){
        var arr = model.getData().lucky;
        for (let index = 0; index < arr.length; index++) {
            if(arr[index] == element)
                return true;
        }
        return false;
    }

    var insertNumber = function(number){

        var combinations = model.getData().lucky;
        combinations.push(number);
    };

    var isValid = function(){
        return (model.getData().lucky.length < 6) ? true : false;
    };

    var generateNumbers = function(number){

        while(isValid()){
            var draw = (Math.floor(Math.random() * number) + 1);
            if(!arrayContains(draw))
                insertNumber(draw);
        }
        console.log(model.getData().lucky);
        view.loadImages(model.getData().lucky);
        reset();
    };

    var reset = function(){
        model.resetData();
    };  

    return {
        init: function(){
            SetUpEventListeners();
            console.log("Components Loaded..");
        }
    };
    
})(generatorModel, generatorView);

controller.init();