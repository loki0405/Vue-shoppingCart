let vm=new Vue({
	el:'#app',
	data(){
		return{
			totalMoney:0,
		    totalPrice:0,
			productList:[],
			isShow:false,
			delIndex:0,
			checkedAll:false
		}
	},
	filters:{
		formMoney(val){
			return "￥"+val.toFixed(2)
		}
	},
	mounted:function(){
		this.creatData()
	},
	methods:{
		creatData(){
			axios.get('data/cartData.json').then((res)=>{
				console.log(res.data.result.list);
				this.productList=res.data.result.list
				this.totalMoney=res.data.result.totalMoney;
			})
		},
		changeMoney(goods,way){
			if(way>0){
				goods.productQuantity++;
			}else{
				goods.productQuantity--;
				if(goods.productQuantity<1){
					goods.productQuantity=1;
				}
			}
		},
		seloct(goods){
			if (typeof goods.checked == 'undefined'){                   
                this.$set(goods,"checked",true);   
            } else {
                goods.checked = !goods.checked;   
            }
            
            let flagAll = true;
            this.productList.forEach(item=> {           
                flagAll = flagAll && item.checked;
            });
            this.checkedAll = flagAll;  
		},
		checkFlag(flag){			
            if (flag){
                this.checkedAll = !this.checkedAll;                                                          
            } else {
                this.checkedAll = false;      
            }
            this.productList.forEach((item,index)=>{           
                if (typeof item.checked == 'undefined'){   
                    this.$set(item,"checked",this.checkedAll);                                                                   
                } else {
                    item.checked = this.checkedAll;  
                }
            }); 
		},
		delGood(curent){
			this.isShow=true;
			this.delIndex=curent;
		},
		delcunrt(){
			this.isShow=false;
			this.productList.splice(this.delIndex,1);
		}
	},
	computed:{
		comtotalPrice(){
			this.totalPrice=0;
			this.productList.forEach((item)=>{
				if(item.checked){
					this.totalPrice+=(item.productPrice)*(item.productQuantity);
				}				
			})
			
			return this.totalPrice;
		}
	}
})
