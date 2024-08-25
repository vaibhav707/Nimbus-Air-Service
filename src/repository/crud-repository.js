class CrudRepository{

    constructor(model){
        this.model=model;
    }

    async create(data){
        try {
            const result=await this.model.create(data);
            return result;
        } catch (error) {
            console.log("something went wrong at repository layer");
            throw {error};
        }
    }

    async delete(modelid){
        try {
            await this.model.destroy({
                where:{
                    id:modelid,
                }
            });
        } catch (error) {
            console.log("something went wrong at repository layer");
            throw {error};
        }
    }

    async get(modelid){
        try {
            const result=await this.model.findByPk(modelid);
            return result;
        } catch (error) {
            console.log("something went wrong at repository layer");
            throw {error};
        }
    }

    async update(modelid,data){
        try {
            await this.model.update(data,{
                where:{
                    id:modelid,
                }
            });
            return this.get(modelid);
        } catch (error) {
            console.log("something went wrong at repository layer");
            throw {error};
        }
    }

}

module.exports=CrudRepository;