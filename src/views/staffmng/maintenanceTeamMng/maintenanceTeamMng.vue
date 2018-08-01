<template>
   <div style="background: #EEE;padding: 10px;">
       <Card>
           <div slot="title">
               <Row type="flex" justify="space-between">
                   <Col>
                       <p>维护人员团队管理</p>
                   </Col>
                   <Col>
                       <Button type="primary" @click="outputteamTableData">导出</Button>
                       <transition name="fade">
                       <Button type="error" @click="removeteam" v-if="teamIsActive">解除</Button></transition>
                   </Col>
               </Row>
           </div>
           <Form :model="teamquerydata" inline>
               <FormItem><Input v-model="teamquerydata.referee" type="text" placeholder="请输入推荐人"/></FormItem>
               <FormItem><Input v-model="teamquerydata.recommended" type="text" placeholder="请输入被推荐人"/></FormItem>
               <FormItem><Input v-model="teamquerydata.location" type="text" placeholder="请输入接受地点"/></FormItem>
               <Button type="primary">查询</Button>
           </Form>
           <Table :columns="teamTableColumns" :data="teamTableData" highlight-row @on-current-change="holdselectedrow"></Table>
       </Card>
   </div>
</template>

<script>
    import util from '../../../libs/util.js'
    export default {
        name: "maintenanceTeamMng",
        data:function(){
            return{
                teamquerydata:{
                    referee:"",
                    recommended:"",
                    location:""
                },
                teamTableColumns:this.mockteamTableColumns(),
                teamTableData:this.mockteamTableData(),
                teamIsActive:0
            }
        },
        methods:{
            mockteamTableColumns(){
                let data=[];
                const keyArr=["referee","recommended","location","date","status"];
                const titleArr=["推荐人","被推荐人用户名/姓名","接受地点","推荐时间","推荐状态"];
                data.push({
                    key:"No",
                    title:"序号",
                    render:(h,params)=>{
                        const index=params.index+1;
                        return h("div",index)
                    }
                });
                for(let i=0;i<keyArr.length-1;i++){
                   data.push({
                       key:keyArr[i],
                       title:titleArr[i]
                   })
                }
                data.push({
                    key:"status",
                    title:"推荐状态",
                    render:(h,params)=>{
                        const status=params.row.status;
                        const color=status===0?'red':'green';
                        const text=status===0?'解除':'有效';
                        return h('Tag',{props:{type:"dot",color:color}},text)
                    }
                });
                return data
            },
            mockteamTableData(){
                let data=[];
                for(let i=0;i<10;i++){
                    data.push({
                        referee:util.generateRandomName(),
                        recommended:util.getRandomUsername()+"/"+util.generateRandomName(),
                        location:util.getRandomCompany(),
                        date:"",
                        status:Math.round(Math.random())
                    })
                }
                return data
            },
            outputteamTableData(){
                this.teamIsActive=!this.teamIsActive;
            },
            holdselectedrow(index){
                console.log(index);
                this.teamIsActive=index.status;
            },
            removeteam(){
                //解除推荐关系
            }
        }
    }
</script>

<style scoped>

</style>