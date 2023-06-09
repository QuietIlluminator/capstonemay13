var model = null


var classes = ['Actinic Keratoses', 'Basal Cell Carcinoma', 'Benign Keratoses', 'Dermatofibroma', 'Melanoma', 'Melanocytic Nevus', 'Vascular Lesion']




async function predict(){


   try {
       if(imgtag.src == ""){
           alert("Select an Image to Classify")
           return
       }


       let tensorImg = tf.browser.fromPixels(imgtag)
                       .resizeNearestNeighbor([75, 100])
                       .toFloat().expandDims();
      
       model.predict(tensorImg).data().then(
   function (prediction){
       let predicted_class = prediction.indexOf(Math.max(...prediction))




       console.log(classes[predicted_class])
       console.log(prediction)


       prediction_text.innerHTML = classes[predicted_class]
       probability_text.innerHTML = Math.round(prediction[predicted_class] * 100) + "% Confidence"
   }
)
      
   }catch(error){
       alert("Error Classifying Image")
   }
}


// Select our Image and Display it


function onFileSelected(event) {


   try {
       var selectedFile = event.target.files[0];
       var reader = new FileReader();


       imgtag.title = selectedFile.name;


       reader.onload = function(event) {
           imgtag.src = event.target.result;
       };


       reader.readAsDataURL(selectedFile);
   }catch (error){
       alert("Error Reading Image")
   }
  
}


//  Select our Image and Display it


async function loadModel(){
   console.log("Loading Model")
  model = await tf.loadLayersModel('https://raw.githubusercontent.com/QuietIlluminator/Capstone/a9df64a59128d0cc48ed9e6eef6d1a8a99c62720/model.json')
   console.log("Loaded Model")


   loadingmodel.innerHTML = "Loaded ML Model"
   progressbar.style.display = "none"
}


loadModel()
