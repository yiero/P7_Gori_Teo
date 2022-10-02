
module.exports = (sequelize, Datatypes) => {
    const Like = sequelize.define("like", {
        
    }, 
    {
        uniqueKeys : {
            like_unique: {
                fields: ['userId', 'topicId']
            }
        }
    }
    )
    return Like;
}