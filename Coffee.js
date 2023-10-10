class coffee {
    constructor(name, earning, time_to_earn, upgrade_cost, cost_increment, unlock_cost, number) {
        this.progressing = false;
        this.name = name;
        this.identify = "coffee_" + number.toString();
        console.log(this.identify);
        this.lvl= 1;
        this.earn = earning;
        this.earn_increment = earning;
        this.time_to_earn = time_to_earn;
        this.upgrade_cost = upgrade_cost;
        this.cost_increment = cost_increment;
        this.unlock_cost = unlock_cost;
        this.unlocked;
        this.automate = false;
        this.automate_cost = upgrade_cost * 20;
        this.progress_bar_id = "progress_"+ number.toString();
        if (this.unlock_cost == 0){
            this.unlocked = true;
        }
        else{
            this.unlocked = false;
        }
        //setting ids and class names using this.name as a base, which I should have done a long time ago to save me a ton of headache
        this.unlock_id;
        this.unlock_cs;
        if(this.name != "Plain"){
            this.unlock_id = "unlock_"+ this.name.toLowerCase();
            this.unlock_cs = this.name.toLowerCase()+"-lockable";
        }
        this.auto_id = "auto_"+ this.name.toLowerCase();

        //after initialization, it checks localstorage, and modifies the lvl variable, automate bool, and unlock bool.
        //Normally, alone it would just break the code to only modify lvl, so I implemented a match_variables_to_lvl() 
        //function that I can't call here because it calls variables not in the class that haven't been defined yet that would also break the code.
        if (localStorage.getItem(this.name) != null){
            let temp = JSON.parse(localStorage.getItem(this.name));
            console.log(temp);
            this.lvl = temp.coffee_lvl;
            this.automate = temp.coffee_automated;
            this.unlocked = temp.coffee_unlocked;
        }
        else{
            local_initialize(this.name,this.unlocked,this.lvl,this.automate);
        }

        this.set_coffee_interval = setInterval(function(){
            if (this.automate == true){
                earn(this, this.identify);
            }
        }.bind(this), this.get_time_in_ms()); 

        this.match_variables_to_lvl();
    }
    //get functions
    get_name(){
        return this.name;
    }
    get_auto_interval(){
        return this.set_coffee_interval;
    }
    get_unlock_cost(){
        return this.unlock_cost;
    }
    is_unlocked(){
        return this.unlocked;
    }

    //progress bar
    is_progressing(){
        return this.progressing;
    }
    change_progress(){
        if (this.progressing == false){
            this.progressing = true;
        }
    }
    finished_progress(){
        if (this.progressing == true){
            this.progressing = false;
        }
    }
    get_earn(){
        return this.earn;
    }
    get_lvl(){
        return this.lvl;
    }
    get_sell(){
        return Math.floor(this.get_upgrade_cost()*.75);
    }
    get_upgrade_cost(){
        return this.upgrade_cost;
    }
    get_time_in_ms(){
        return this.time_to_earn*1000;
    }
    get_increment(){
        return this.cost_increment;
    }
    check_automate(){
        return this.automate;
    }
    get_automate_cost(){
        return this.automate_cost;
    }
    get_progress_id(){
        return this.progress_bar_id;
    }


    //enable functions
    unlock(){
        this.unlocked = true;
    }
    enable_automate(){
        this.automate = true;
        this.automated_id();
    }


    //increment functions
    increase_lvl(){
        this.lvl += 1;
        this.upgrade_cost+= this.cost_increment;
        this.earn += this.earn_increment;
        this.update();
    }
    decrease_lvl(){
        this.update_sell();
        this.lvl -= 1;
        this.upgrade_cost-= this.cost_increment;
        this.earn -= this.earn_increment;
    }

    //update conditions
    update(){
        if (this.lvl == 10){
            this.time_to_earn /= 2.0;
            this.earn_increment *= 2;
            this.cost_increment *= 3;
            console.log("whoops");
        }
        if (this.lvl == 25){
            this.time_to_earn /= 2.0;
            this.earn_increment *= 3;
            this.cost_increment *= 4;
        }
        if (this.lvl == 50){
            this.time_to_earn /= 2.0;
            this.earn_increment *= 3;
            this.earn *= 2;
            this.cost_increment *= 3;
        }
        
        this.automated_id();
    }
    update_sell(){
        if (this.lvl == 10){
            this.time_to_earn *= 2.0;
            this.earn_increment /= 2;
            this.cost_increment /= 3;
        }
        if (this.lvl == 25){
            this.time_to_earn *= 2.0;
            this.earn_increment /= 3;
            this.cost_increment /= 4;
        }
        if (this.lvl == 50){
            this.time_to_earn *= 2.0;
            this.earn_increment /= 3;
            this.earn /= 2;
            this.cost_increment /= 3;
        }
        this.automated_id();
    }
    
    automated_id(){
        console.log("why");
        if (this.automate == true){
            clearInterval(this.set_coffee_interval);
            clearInterval(this.set_coffee_interval);
            clearInterval(this.set_coffee_interval);
            console.log(this);
            this.set_coffee_interval = setInterval( function(){
                    earn(this, this.identify);
            }.bind(this), this.get_time_in_ms());
            console.log('hi');
            this.set_coffee_interval;
        }
        //implement coffee requirement
        //If I ever revisit this code, this is the first thing I will do away with.
        //it is an abomination
        //Unfortunately, doing away with this requires completely restructuring my formatting, which is why I haven't done it already
        /*if (this.automate == true && this.name == "Plain"){
            clearInterval(plain_coffee_automate);
            plain_coffee_automate = setInterval( function(){
                if (plain_coffee.check_automate() == true){
                    earn(plain_coffee, "coffee_0");
                }
            }, plain_coffee.get_time_in_ms());
            plain_coffee_automate;
        }
        if (this.automate == true && this.name == "Hazelnut"){
            clearInterval(hazelnut_coffee_automate);
            hazelnut_coffee_automate = setInterval( function(){
                if (hazelnut_coffee.check_automate() == true){
                    earn(hazelnut_coffee, "coffee_1");
                }
            }, hazelnut_coffee.get_time_in_ms());
            hazelnut_coffee_automate;
        }
        if (this.automate == true && this.name == "Vanilla"){
            clearInterval(vanilla_coffee_automate);
            vanilla_coffee_automate = setInterval( function(){
                if (vanilla_coffee.check_automate() == true){
                    earn(vanilla_coffee, "coffee_2");
                }
            }, vanilla_coffee.get_time_in_ms());
            vanilla_coffee_automate;
        }
        if (this.automate == true && this.name == "Spice"){
            clearInterval(spice_coffee_automate);
            spice_coffee_automate = setInterval( function(){
                if (spice_coffee.check_automate() == true){
                    earn(spice_coffee, "coffee_3");
                }
            }, spice_coffee.get_time_in_ms());
            spice_coffee_automate;
        }*/
    }
    

    match_variables_to_lvl(){
        if (this.unlocked == true && this.name != "Plain"){
            money += this.unlock_cost;
            verify_unlock(this, this.unlock_id,this.unlock_cs);
        }
        if (this.automate == true){
            money += this.automate_cost;
            console.log(this.auto_id);
            buy_auto(this, this.auto_id);
        }
        if (this.lvl > 1){
            let swap = this.lvl;
            this.lvl = 1;
            for (let i = 1; i < swap; i++){
                this.lvl++;
                this.upgrade_cost+= this.cost_increment;
                this.earn += this.earn_increment;
                this.update();
            }   
        }
    }
}

//out of class functions

function reset_game(){
    localStorage.clear();
    window.localStorage.clear();
    window.localStorage.clear();
    window.localStorage.clear();
    window.localStorage.clear();
    location.reload();
}

//doesn't work
//garbage 
//harder than implementing local storage
//explode
function progress_bar(coffee_){
    if (coffee_.is_progressing() == false) {}
    else{
        let elem = document.getElementById(coffee_.get_progress_id());
        elem.style.transition = (coffee_.get_time_in_ms()/1000);
        elem.style.width = 100;
        coffee_.finished_progress();

    }
}

//face functions
function earn(coffee_, id){
    if (document.getElementById(id) != null){
        document.getElementById(id).disabled = true;
    }
    coffee_.change_progress();
    progress_bar(coffee_, id);
    if(coffee_.check_automate() == false){
        setTimeout(function(){
            money +=coffee_.get_earn();
            document.getElementById(id).disabled = false;
        }, coffee_.get_time_in_ms())
    }
    else{
        money +=coffee_.get_earn();
    }
}
function buy(coffee_){
    if (money >= coffee_.get_upgrade_cost()){
        money -= coffee_.get_upgrade_cost();
        coffee_.increase_lvl();
    }
}

function sell(coffee_){
    if (coffee_.get_lvl() == 1){

    }
    else{
        money += Math.floor(coffee_.get_upgrade_cost()*.75);
        coffee_.decrease_lvl();
    }
}

//enable functions functions
function buy_auto(coffee_,id){
    if (money >= coffee_.get_automate_cost()){
        money -= coffee_.get_automate_cost();
        coffee_.enable_automate();
        document.getElementById(id).style.display="none";

    }
}

function verify_unlock(coffee_, id, cs){
    if (money >= coffee_.get_unlock_cost()){
        money -= coffee_.get_unlock_cost();
        coffee_.unlock();
        unlock(id, cs);
    }
}
//unfortunately, setting display to none then back to block undos formatting, and I can't figure out how to fix it
//I fixed it, but forgot how I did it
function unlock(id, cs){
    let lock = document.getElementById(id);
    lock.style.display="none";
    let classProp=document.getElementsByClassName(cs);
    if (classProp.length = 0){
    }
    else{
        for (let i = 0; i < classProp.length; i++){
            classProp[i].style.display = "block";
            classProp[i].parentElement.style.display = "block";
            classProp[i].parentNode.style.flexDirection = "row";
            classProp[i].parentNode.style.textAlign = "center";
            classProp[i].parentElement.style.justifyContent = "center";
        }
    }
}


//local storage functions

function local_load(name){
    return JSON.parse(localStorage.getItem(name));
}
function local_initialize(name, unlocked, lvl = 1, automated = false){
    coffeeObj = {
        coffee_name:name,
        coffee_unlocked:unlocked,
        coffee_lvl:lvl,
        coffee_automated:automated,
    };
    coffeeObj_serialized = JSON.stringify(coffeeObj);
    localStorage.setItem(coffeeObj.coffee_name,coffeeObj_serialized);
}

function local_update(name, unlocked,lvl, automated){
    coffeeObj = {
        coffee_name:name,
        coffee_unlocked:unlocked,
        coffee_lvl:lvl,
        coffee_automated:automated,
    };
    coffeeObj_serialized = JSON.stringify(coffeeObj);
    localStorage.setItem(coffeeObj.coffee_name,coffeeObj_serialized);
}

//initialize game 

//recall through local storage
let Money_obj={
    name: "money",
    value:0
};

if (localStorage.getItem("Money_obj") != null){
    let temp = JSON.parse(localStorage.getItem("Money_obj"));
    console.log(temp);
    Money_obj.value = temp.value;
}
else{
    Money_obj_serialized = JSON.stringify(Money_obj);
    localStorage.setItem("Money_obj",Money_obj_serialized);
}
Money_obj_serialized = JSON.stringify(Money_obj);
localStorage.setItem("Money_obj",Money_obj_serialized);
let Money_obj_deserialized = JSON.parse(localStorage.getItem("Money_obj"));
//define money variable and feed it the local storage retrieved money
let money = Money_obj_deserialized.value;

let coffee_list = [];
//make coffee
//implement coffee requirement
let plain_coffee = new coffee("Plain",1,1,5,2,0,0); //name, money made, time for money to be made, cost of upgrading lvl, increasing cost of upgrading, unlock cost
let hazelnut_coffee = new coffee("Hazelnut",15,3,20,5, 50,1);
let vanilla_coffee = new coffee("Vanilla",50,7,35,9, 200,2);
let spice_coffee = new coffee("Spice",500,20,200,60, 2000,3);
//makes it convienent
//implement coffee requirement
coffee_list.push(plain_coffee);
coffee_list.push(hazelnut_coffee);
coffee_list.push(vanilla_coffee);
coffee_list.push(spice_coffee);



//html interface update variables
//implement coffee requirement
/*let plain_coffee_automate = setInterval( function(){
    if (plain_coffee.check_automate() == true){
        earn(plain_coffee, "coffee_0");
    }
}, plain_coffee.get_time_in_ms());

let hazelnut_coffee_automate = setInterval( function(){
    if (hazelnut_coffee.check_automate() == true){
        earn(hazelnut_coffee, "coffee_1");
    }
}, hazelnut_coffee.get_time_in_ms());

let vanilla_coffee_automate = setInterval( function(){
        if (vanilla_coffee.check_automate() == true){
            earn(vanilla_coffee, "coffee_2");
        }
    }, vanilla_coffee.get_time_in_ms());

let spice_coffee_automate = setInterval( function(){
    if (spice_coffee.check_automate() == true){
        earn(spice_coffee, "coffee_3");
    }
}, spice_coffee.get_time_in_ms());*/
//

//match the rest of the coffee class variables to the local storage retrieved lvl, because I'm too lazy to manually retrieve everything.
//Also, it has to be done here because .match_variables_to_lvl() calls .automated_id() which uses the defined setInterval variables (plain_coffee_automate, hazelnut_coffee_automate, etc.) and the code
//breaks if called before here because the variables technically haven't been defined until just now.
/*plain_coffee.match_variables_to_lvl();
hazelnut_coffee.match_variables_to_lvl();
vanilla_coffee.match_variables_to_lvl();
spice_coffee.match_variables_to_lvl();*/


//To implement when I'm feeling not lazy.
//As a matter of fact, past me, I implemented this precisely because I was feeling lazy.
//basically, it compiles all of the things I want to update continuously in my html, so I can update it all with a single setInterval
function update_html(){
    for(let i = 0; i < coffee_list.length; i++){
        let c_coffee = "coffee_" + i.toString();  
        let c_earn = "earn_"+ i.toString(); 
        let c_cost = "cost_" + i.toString(); 
        let c_sell = "sell_" + i.toString(); 
        let c_lvl = "lvl_" + i.toString(); 
        let c_unlock = "unlock_" + i.toString(); 
        let c_auto = "auto_" + i.toString(); 
        if (c_cost == null){

        }
        else{
            document.getElementById(c_cost).innerHTML = coffee_list[i].get_upgrade_cost();
            document.getElementById(c_lvl).innerHTML = coffee_list[i].get_lvl();
            document.getElementById(c_earn).innerHTML = coffee_list[i].get_earn();
            document.getElementById(c_sell).innerHTML = coffee_list[i].get_sell();
            document.getElementById(c_auto).innerHTML = coffee_list[i].get_automate_cost();
            if (coffee_list[i].is_unlocked() == false){
                document.getElementById(c_unlock).innerHTML = coffee_list[i].get_unlock_cost();
            }
            local_update(coffee_list[i].get_name(), coffee_list[i].is_unlocked(), coffee_list[i].get_lvl(),coffee_list[i].check_automate());
        }
    }
}

//right here
//I mean, technically I could've just put update_html's contents in an anonomous setInterval function to the same effect, but this makes my brain hurt less
setInterval(update_html,100);

//update function
//money
setInterval(function() {
    document.getElementById('money').innerHTML = money;
    Money_obj.value = money;
    Money_obj_serialized = JSON.stringify(Money_obj);
    localStorage.setItem("Money_obj",Money_obj_serialized);
}, 100);
//various html number updates
//plain
/*
setInterval(function() {
    document.getElementById('plain_cost').innerHTML = plain_coffee.get_upgrade_cost();
}, 100);
setInterval(function() {
    document.getElementById('plain_lvl').innerHTML = plain_coffee.get_lvl();
}, 100);
setInterval(function() {
    document.getElementById('plain_earn').innerHTML = plain_coffee.get_earn();
}, 100);
progress_bar(plain_coffee, "plain_progress");
//hazelnut
setInterval(function() {
    document.getElementById('hazelnut_cost').innerHTML = hazelnut_coffee.get_upgrade_cost();
}, 100);
setInterval(function() {
    document.getElementById('hazelnut_lvl').innerHTML = hazelnut_coffee.get_lvl();
}, 100);
setInterval(function() {
    document.getElementById('hazelnut_earn').innerHTML = hazelnut_coffee.get_earn();
}, 100);
setInterval(function() {
    document.getElementById('hazelnut_unlock').innerHTML = hazelnut_coffee.get_unlock_cost();
},100);*/

