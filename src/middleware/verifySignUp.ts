import db from '../models/index';

const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req:any, res:any, next:any) => {

    const user = await User.findOne({
        where:{
            username:req.body.username
        }
    })
    if(user){
        res.status(400).send({
            message:"user Already exist"
        })
        return;
    }
    //Email
    const userEmail = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (userEmail) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }
      next();
}

const checkRolesExisted = (req:any, res:any, next:any) => {
     if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
}
const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

export default verifySignUp;