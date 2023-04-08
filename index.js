/*

total 5 functions

1- check ID  -1.anaylze input
               -1.1getAge
    
2- create ID   -1.createID
*/




function getAge(day,month,year){

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth()+1;
    age = currentYear - year;
    m = currentMonth - month;
    if (m < 0 || (m === 0 && currentDate.getDate() < day)) 
    {
        age--;
    }

    return age;
}


function analyzeInput(day,month,year,idvNum,generation){
    let validStatus= "true";
    let newidvNum ="";

    //check the last control character is right or not
    for(j=0;j<idvNum.length-1;j++){
        newidvNum = newidvNum + idvNum.charAt(j);
    }
  

        monthInt = parseInt(month);
        dayInt=parseInt(day);
        yearInt=parseInt(year);

        stringSex= "";
        let analyzeOutput = "";


        if((generation+yearInt)%4== 0){
            if(monthInt==2 & dayInt>28 & dayInt<= 31){
                validStatus="false";
                analyzeOutput="false, day or month is incorrect";
                return analyzeOutput;
            }else if(monthInt==2 & dayInt> 31){
                validStatus="false";
                analyzeOutput="false, day is wrong";
                return analyzeOutput;
            }
        }

        if(monthInt==2||monthInt==4||monthInt==6||monthInt==8||monthInt==9||monthInt==11){
            if(monthInt==2 & dayInt>27 & dayInt <=31){
                validStatus="false";
                analyzeOutput="false, day or month is incorrect";
                return analyzeOutput;
            }else if(monthInt==2 & dayInt>31){
                validStatus="false";
                analyzeOutput="false, day is wrong";
                return analyzeOutput;
            }else if(dayInt>30){
                validStatus="false";
                analyzeOutput="false, day or month is incorrect";
                return analyzeOutput;
            }
        }else if(monthInt==1|| monthInt==3||monthInt==5||monthInt==7||monthInt==8||monthInt==10||monthInt==12){
            if(dayInt>31){
            validStatus="false";
            analyzeOutput="false, day is wrong";
            return analyzeOutput;
            }
        }

        
        if((idvNum.charAt(3) != createID(day,month,year,newidvNum))==true){
            validStatus ="false";
            analyzeOutput="false, the control character is not right";
            return analyzeOutput;
        }
        

        // if validStatus = 'true'
        for(i=0;i<idvNum.length;i++){
            if(i==2){
                if(parseInt(idvNum.charAt(i))% 2 == 0){
                    stringSex="Female";
            }else{
                    stringSex ="Male";
                }
            }
        }

        var age = getAge(dayInt,monthInt,yearInt+generation);

    if(age<0){
        analyzeOutput = "invalid birthyear, please input the correct birthyear" ;
        return analyzeOutput;
    }

    if(validStatus == "true"){
        analyzeOutput = "is valid: "+ validStatus+"\n"+"sex: "+stringSex+"\n"+"age: "+age;
    }
    return analyzeOutput;
}


let checkButton = document.getElementById("check-btn");

checkButton.onclick = function checkInput(){

    let textInput = document.getElementById("check-input").value;

    day = "";
    month = "";
    year = "";
    idvNum ="";
    generation=0;

    valid=true;
    inputError=false;

    if(textInput.length!=11){
        inputError=true;
    }else{
    for(i=0;i<textInput.length;i++){
        
        if(i==0 || i==1){
            day = day + textInput.charAt(i);
        }
        if(i==2 || i==3){
            month = month + textInput.charAt(i);
        }
        if(i== 4 || i ==5){
            year = year + textInput.charAt(i);    
        }
        if(i==6){
            if(textInput.charAt(i)=="+"){
                generation = 2000;
            }else if(textInput.charAt(i)=="-"){
                generation = 1900;
            }else{
                inputError=true;
                break;
            }
        }
        if(i>6){
            idvNum = idvNum +textInput.charAt(i);
        }
    }
    }
    
    if(valid==true & inputError ==false){
        let resultOutput = analyzeInput(day,month,year,idvNum,generation);
        document.getElementById("check-output").innerText = resultOutput;
    }else if(inputError == true){
        document.getElementById("check-output").innerText = "Please input the correct form of a personal identity code, don't leave any space in the box";
    }

}



function createID(day,month,year,idvNum){
    id=" ";
    serialNum = day+month+year+idvNum;
    num =  parseInt(serialNum);

    let remainder = Math.round(num%31);
       
   
   
        if(remainder<10){
            id = remainder.toString();
        }else{
            for(i=0;i<=remainder-6;i++){
                if(i==6 || i ==8|| i==14 || i==16){
                    i++;
                    id = String.fromCharCode(65+i);
                }else{
                    id = String.fromCharCode(65+i);
                }

        }
        }
    

    return id;

}


let createButton = document.getElementById("create-btn");

createButton.onclick = function createInput(){

    let createInput = document.getElementById("create-input").value;

     day = "";
     month = "";
     year = "";
     idvNum ="";
     generation=0;

     valid=true;
     inputError=false;

    if(createInput.length!=10){
        inputError=true;
    }else{
    for(i=0;i<createInput.length;i++){
        
        if(i==0 || i==1){
            day = day + createInput.charAt(i);
        }
        if(i ==2 || i==3){
            month = month + createInput.charAt(i);
        }
        if(i== 4 || i ==5){
            year = year + createInput.charAt(i);    
        }
        if(i==6){
            if(createInput.charAt(i)=="+"){
                generation = 2000;
            }else if(createInput.charAt(i)=="-"){
                generation = 1900;
            }else{
                inputError=true;
                break;
            }
        }
        if(i>6){
            idvNum = idvNum +createInput.charAt(i);
        }
    }
    }


    if(valid==true & inputError ==false){
       document.getElementById("create-output").innerText = "output: "+ createID(day,month,year,idvNum);
    }else if(inputError == true){
        document.getElementById("create-output").innerText = "Please input the correct form of a personal identity code, don't leave any space in the box";
    }


    
}
