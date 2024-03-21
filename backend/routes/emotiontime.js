var express = require('express');
var router = express.Router();
var EmotionTime = require('../models/emotiontime');
const { verifyToken } = require('../auth/jwt');

router.post('/post',verifyToken,async function(req,res,next){
  try {
    const EmotionTimeModal = new EmotionTime({userid:req.user.id,emotionTime:req.body.emotionTime});
    const EmotionTimeSave =  await EmotionTimeModal.save()
    res.status(200).json(EmotionTimeSave);
  } catch (error) {
      console.log(error);
      next(error);
  }
});

router.get('/get',verifyToken,async(req,res,next)=>{
  try {
    const emotiontimes=await EmotionTime.find({userid:req.user.id});
    return res.status(200).json(emotiontimes);
  } catch (error) {
      console.log(error);
      next(error);
  }
});

// router.delete('/delete/:id', async (req, res, next) => {
//   try {
//     const journal = await Journal.findOneAndDelete({ _id: req.params.id });
//     if (!journal) {
//       return res.status(404).send({ message: `Journal not found with ID ${req.params.id}` });
//     }
//     return res.status(200).send({ message: `Journal with ID ${req.params.id} deleted successfully` });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });


module.exports = router;