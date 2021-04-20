const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
  text: {
    type:String,
    required: true,
    maxLength:160
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  } 
});

//message remove hook 
//we find that user and we remove the id of that user 
//and then that messeg is removed from the list of array of messages inside user schema refering to its 
//messages
messageSchema.pre('remove', async function(next){
  
  try {
    //find a user
      let user = await User.findById(this.user);
      //remove the id of the messages from their message list 
      user.messages.remove(this.id);
      // save that user 
      await user.save();//mongoose method
      //return next 
      return next();
  } catch(err){
      return next(err);
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message; 
