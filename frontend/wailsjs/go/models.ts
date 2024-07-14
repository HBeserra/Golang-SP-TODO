export namespace todo {
	
	export class Todo {
	    id: number;
	    title: string;
	    category: string;
	    completed: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Todo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.category = source["category"];
	        this.completed = source["completed"];
	    }
	}

}

