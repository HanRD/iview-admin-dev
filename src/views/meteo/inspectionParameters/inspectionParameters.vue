<template>
    <div>
        <div style="padding:10px;background: #eee">
            <Card>
                <Row type="flex" justify="space-between">
                    <Col>
                        <Form :model="query">
                            <FormItem><Input v-model="query.model" placeholder="观测要素编码"/></FormItem>
                        </Form>
                        <Button type="primary" @click="submitquery">查询</Button></Col>
                    <Col>
                        <Button type="primary" @click="exportTableData">导出</Button>
                        <Button type="primary" @click="createNewData">新增</Button>
                    </Col>
                </Row>
                <Table :columns="parametersTableColumns" :data="parametersTableData"></Table>
            </Card>
        </div>
        <Modal v-model="showModal">
            <div slot="header"><p>{{modalTitle}}</p></div>
            <Form :label-width=80 label-position="left" :model="parameterData">
                <FormItem label="要素编号"><Input v-model="parameterData.id" type="text"/></FormItem>
                <FormItem label="要素名称"><Input v-model="parameterData.name" type="text"/></FormItem>
                <FormItem label="服务价格"><Input v-model="parameterData.cost" type="text"/></FormItem>
                <FormItem label="备注"><Input v-model="parameterData.note" type="textarea"/></FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="closeModal">取消</Button>
                <Button type="primary" @click="submitModalData">确定</Button>
            </div>
        </Modal>
    </div>
</template>


<script>
    import util from '../../../libs/util'
    export default {
        name: "inspectionParameters",
        data:function(){
            return{
                showmodal:false,
                modalTitle:"",
                parameterData:{
                    id:"",
                    name:"",
                    cost:"",
                    note:""
                },
                parametersTableColumns:this.mockTableColumns(),
                parametersTableData:this.mockTableData()
            }
        },
        methods:{
                mockTableColumns(){
                    let data=[];
                    const keyArr=['id','name'];
                    const titleArr=['编号','名称'];
                    data=util.renderTableNoColumn(data);
                    data=util.renderTableNormalColumn(data,keyArr,titleArr);
                    data.push({
                        key:"control",
                        title:"操作",
                        render:(h,params)=>{
                            const index=params.index;
                            return h('div',[
                                h('Button',{props:{type:"error",size:"small"},style:{marginRight:"5px"},on:{click:()=>{this.deleteItem(index)}}},'删除'),
                                h('Button',{props:{type:"primary",size:"small"},on:{click:()=>{this.reviseItem(index)}}},'修改')
                            ])
                        }
                    })
                    return data
            },
            deleteItem(index){

            },
            reviseItem(index){

            },
            submitquery(){

            },
            exportTableData(){

            },
            createNewData(){

            },
            closeModal(){

            },
            submitModalData(){

            }

        }
    }
</script>

<style scoped>

</style>