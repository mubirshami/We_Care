var express = require('express');
var router = express.Router();
var MeditationTime = require('../models/meditationtime');
const { verifyToken } = require('../auth/jwt');

router.post('/post',verifyToken,async function(req,res,next){
  try {
    const MeditationTimeModal = new MeditationTime({userid:req.user.id,meditationTime:req.body.meditationTime});
    const MeditationTimeSave =  await MeditationTimeModal.save()
    res.status(200).json(MeditationTimeSave);
  } catch (error) {
      console.log(error);
      next(error);
  }
});

router.get('/get',verifyToken,async(req,res,next)=>{
  try {
    const meditationtimes=await MeditationTime.find({userid:req.user.id});
    return res.status(200).json(meditationtimes);
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