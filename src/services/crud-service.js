class CrudService{

    constructor(repository){
        this.repository=new repository();
    }

    async create(data){
        try {
            const result=await this.repository.create(data);
            return result;
        } catch (error) {
            console.log("Something wrong at Service layer");
            throw {error};
        }
    }

    async get(id){
        try {
            console.log(id);
            const result=await this.repository.get(id);
            return result;
        } catch (error) {
            console.log("Something wrong at Service layer");
            throw {error};
        }
    }

    async delete(id){
        try {
            const response=await this.repository.delete(id);
            return response;
        } catch (error) {
            console.log("Something wrong at Service layer");
            throw {error};
        }
    }

    async update(id,data){
        try {
            const result=await this.repository.update(id,data);
            return result;
        } catch (error) {
            console.log("Something wrong at Service layer");
            throw {error};
        }
    }
}

module.exports=CrudService;