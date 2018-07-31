<template>
   <div style="background: #EEE;padding: 10px;">
       <Card>
           <div slot="title">
               <Row>
                   <Col>
                       <p>维护人员团队管理</p>
                   </Col>
                   <Col>
                       <Button type="primary" @click="outputteamTableData">导出</Button>
                       <Button type="error" @click="removeteam">解除</Button>
                   </Col>
               </Row>
           </div>
           <Form :model="teamquerydata" inline>
               <FormItem><Input v-model="teamquerydata.referee" type="text" /></FormItem>
               <FormItem><Input v-model="teamquerydata.recommended" type="text" /></FormItem>
               <FormItem><Input v-model="teamquerydata.location" type="text" /></FormItem>
               <Button type="primary">查询</Button>
           </Form>
           <Table :columns="teamTableColumns" :data="teamTableData"></Table>
       </Card>
   </div>
</template>

<script>
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
                teamTableData:this.mockteamTableData()
            }
        },
        methods:{
            mockteamTableColumns(){
                let data=[];
                const keyArr=[];
                const titleArr=[];
                for(let i=0;i<keyArr.length;i++){
                   data.push({
                       key:keyArr[i],
                       title:titleArr[i]
                   })
                }
                return data
            },
            mockteamTableData(){

            },
            outputteamTableData(){

            },
            removeteam(){

            }
        }
    }
</script>

<style scoped>

</style>