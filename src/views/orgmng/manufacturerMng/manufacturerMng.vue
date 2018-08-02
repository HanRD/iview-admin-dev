<template>
    <div>
        <div style="padding:10px;background: #eee">
            <Card>
                <Row type="flex" justify="space-between">
                    <Col>
                <Form :model="query">
                    <FormItem><Input v-model="query.name" placeholder="请输入生产厂家名称"/></FormItem>
                </Form>
                    <Button type="primary" @click="submitquery">查询</Button></Col>
                    <Col>
                        <Button type="primary" @click="exportTableData">导出</Button>
                        <Button type="primary" @click="createNewData">新增</Button>
                    </Col>
                </Row>
                <Table></Table>
            </Card>
        </div>
        <Modal v-model="showmodal" :mask-closable="false" :closable="false">
            <div slot="header"><p>{{modaltitle}}</p></div>
            <Form :model="manufacturerData" :label-width=80 label-position="left">
                <FormItem prop="id" label="厂家编号"><Input type="text" v-model="manufacturerData.id" readonly/></FormItem>
                <FormItem prop="name" label="厂家名称"><Input type="text" v-model="manufacturerData.name"/></FormItem>
                <FormItem prop="address" label="厂家地址"><Input type="text" v-model="manufacturerData.address"/></FormItem>
                <Row type="flex" justify="space-between">
                    <Col>
                    <FormItem label="联系人"><Input type="text" v-model="manufacturerData.contact" /></FormItem></Col>
                    <Col>
                        <FormItem label="联系电话"><Input type="text" v-model="manufacturerData.phone"/></FormItem></Col></Row>
                <FormItem label="备注"><Input type="textarea" v-model="manufacturerData.note"/></FormItem>

            </Form>
            <div slot="footer">
                <Button @click="closemodal">取消</Button>
                <Button type="primary" @click="submitData">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import util from '../../../libs/util'
    export default {
        name: "manufacturerMng",
        data:function (){
            return{
                showmodal:false,
                modaltitle:"",
                query:{
                    name:""
                },
                manufacturerData:{
                    id:"",
                    name:"",
                    address:"",
                    phone:"",
                    contact:"",
                    note:""
                },
                manufacturerTableColumns:this.mockTableColumns(),
                manufacturerTableData:this.mockTableData(),
            }
        },
        methods:{
            submitquery(){
                console.log(this.query)
            },
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
                });
                return data
            },
            mockTableData(){
                return util.mockblankrow()
            },
            exportTableData(){

            },
            createNewData(){

            },
            reviseItem(index){

            },
            deleteItem(index){

            },
            closemodal(){

            },
            submitData(){

            }
        }
    }
</script>

<style scoped>

</style>