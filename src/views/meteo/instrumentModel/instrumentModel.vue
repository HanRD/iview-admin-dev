<template>
    <div>
        <div style="padding:10px;background: #eee">
            <Card>
                <Row type="flex" justify="space-between">
                    <Col>
                        <Form :model="query">
                            <FormItem><Input v-model="query.model" placeholder="请输入生产厂家名称"/></FormItem>
                        </Form>
                        <Button type="primary" @click="submitquery">查询</Button></Col>
                    <Col>
                        <Button type="primary" @click="exportTableData">导出</Button>
                        <Button type="primary" @click="createNewData">新增</Button>
                    </Col>
                </Row>
                <Table :columns="instrumentTableColumns" :data="instrumentTableData"></Table>
            </Card>
        </div>
        <Modal v-model="showModal">
            <div slot="header"><p>{{modalTitle}}</p></div>
            <Form :label-width=80 label-position="left" :model="instrumentData">
                <FormItem label="型号规格"><Input v-model="instrumentData.module" type="text"/></FormItem>
                <FormItem label="观测要素"><Input v-model="instrumentData.parameters" type="text"/></FormItem>
                <FormItem label="设备描述"><Input v-model="instrumentData.description" type="text"/></FormItem>
                <FormItem label="生产厂家"><Input v-model="instrumentData.manufacturer" type="text"/></FormItem>
                <FormItem label="厂家地址"><Input v-model="instrumentData.address" type="text"/></FormItem>
                <FormItem label="联系电话"><Input v-model="instrumentData.phone" type="text"/></FormItem>
                <FormItem label="联系人"><Input  v-model="instrumentData.contact" type="text"/></FormItem>
                <FormItem label="设备图片"><Card><a href="src/images/cropper-test.png" target="_blank"><img src="src/images/cropper-test.png" alt=""></a></Card></FormItem>
                <FormItem label="设备手册"></FormItem>
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
        name: "autoStationMng",
        data:function(){
            return{
                showModal:false,
                modalTitle:"",
                query:{
                    model:""
                },
                instrumentData:{
                    module:"",
                    parameters:"",
                    description:"",
                    manufacturer:"",
                    address:"",
                    contact:"",
                    phone:"",
                    image:"",
                    handbook:""
                },
                instrumentTableColumns:this.mockTableColumns(),
                instrumentTableData:this.mockTableData(),


            }
        },
        methods:{
            submitquery(){

            },
            exportTableData(){

            },
            createNewData(){

            },
            closeModal(){

            },
            submitModalData(){

            },
            mockTableColumns(){
                let data=[];
                const keyArr=['model','parameters'];
                const titleArr=['设备型号','观测要素'];
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
            mockTableData(){
                return util.mockblankrow()
            },
            deleteItem(index){

            },
            reviseItem(index){
            }
        }
    }


</script>

<style scoped>

</style>