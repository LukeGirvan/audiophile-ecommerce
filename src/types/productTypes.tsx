export interface Product{
    cartName:string;
    categoriesImage:{
        mobile:string;
        tablet:string;
        desktop:string;

    }
    category:string;
    description:string;
    features:string;
    gallery:{
        first:{
            mobile:string;
            tablet:string;
            desktop:string;
        }
        second:{
            mobile:string;
            tablet:string;
            desktop:string;
        }
        third:{
            mobile:string;
            tablet:string;
            desktop:string;
        }

    }
    id:number;
    image:{
        mobile:string;
            tablet:string;
            desktop:string;
    };

    includes:[
            {
            item:string;
            quantity:number;
            }
        ];
    name:string;
    new:boolean;
    others:[{
        category:string;
        image:{
            mobile:string;
            tablet:string;
            desktop:string;
        }
        slug:string;
        name:string;

    }]
    price:number;
    slug:string;
}

export interface ProductType{
    productType:string;
}

export interface Categories{
    productType:{
        product:{

        }
    }
}