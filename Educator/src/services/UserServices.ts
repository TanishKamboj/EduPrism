import resources from "../utils/resources";
import dbModel from "../config/db/modelCreation";

export default {

    async isUserPreset (user_id : string){
        try{
            const resultData = await dbModel.Users.findOne({
                user_id : user_id
            });
            if(resultData === null){
                return{
                    status: resources.status.fail,
                    message : resources.messages.error.notFound
                }
            }
            else{
                return{
                    status: resources.status.success,
                }
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message: resources.messages.error.generic(err as Error),
            }
        }
    },
    async isUserEducator (email : string) {
        try{
            const resData = await dbModel.Users.aggregate([
                {
                  $match: {
                    email: email,
                  },
                },
                {
                  $lookup: {
                    from: 'educators',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'educator',
                  },
                },
                {
                  $project: {
                    _id: 0,
                    email: 1,
                    user_id: 1,
                    educator: {
                      $cond: {
                        if: { $eq: [{ $size: '$educator' }, 0] }, 
                        then: null, 
                        else: {
                          educator_id: { $arrayElemAt: ['$educator.educator_id', 0] },
                        },
                      },
                    },
                  },
                },
              ]);
            return {
                status: resources.status.success,
                data : resData
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message: resources.messages.error.generic(err as Error),
            }
        }
    },
    async getFullUserData (user_id : string) {
      try{
        const resultData = await dbModel.Users.findOne({
          user_id : user_id
        });
        return {
          status: resources.status.success,
          data : resultData
        }
      }catch(err){
        return {
          status : resources.status.fail,
          message : resources.messages.error.generic(err as Error)
      }
      }
    }
}