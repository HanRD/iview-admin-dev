<template>
    <div>
        <div style="padding:10px;background:#eee">
            <Card>
                <Row type="flex" justify="space-between"><Col>
                <Form inline>
                    <FormItem>
                    <Select v-model="company" placeholder="请选择维护公司">
                        <Option v-for="item in filtercompanylist" :value="item.label" :key="item.label" >{{item.label}}</Option>
                    </Select></FormItem>
                    <FormItem>
                    <Select v-model="inspectionplan" placeholder="请选择巡检方案">
                        <Option v-for="item in filterplanlist" :value="item.label" :key="item.label">{{item.label}}</Option>
                    </Select></FormItem>
                    <FormItem><Input v-model="parameterID" placeholder="请输入项目编码" /></FormItem>
                    <Button type="primary" @click="query">查询</Button>
                </Form></Col>
                    <Col>
                        <Button type="primary">导出</Button>
                        <Button type="primary">导入</Button>
                        <Button type="primary">新增</Button>
                    </Col>
                </Row>
                <Table :columns="parameterTableColumns" :data="parameterTableData"></Table>
            </Card>
        </div>
        <Modal v-model="showmodal">
            <div slot="header"><p>{{modaltitle}}</p></div>
            <Form :label-width=80 label-position="left" :model="parameterdata">
                <Row type="flex" justify="space-between">
                    <Col><FormItem><Input v-model="parameterdata.ID" /></FormItem></Col>
                    <Col><FormItem><Input v-model="parameterdata.orderNo" /></FormItem></Col></Row>
                <FormItem><Input v-model="parameterdata.name" /></FormItem>
                <FormItem>
                    <Select v-model="parameterdata.datatype">
                        <Option v-for="item in typelist" :key="item.value" :value="item.value">{{item.label}}</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button></Button>
                <Button></Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import util from '../../../libs/util.js'
    export default {
        name: "inspectionparameters",
        data:function(){
            return{
                modaltitle:"",
                showmodal:false,
                company:"",
                inspectionplan:"",
                parameterID:"",
                filtercompanylist:this.mockCompanyList(),
                filterplanlist:this.mockPlanList(),
                parameterTableColumns:this.mockparameterTableColumns(),
                parameterTableData:this.mockparameterTableData(),
                parameterdata:{
                    ID:"",
                    orderNo:"",
                    name:"",
                    datatype:"",
                    datadetail:{}
                },
                typelist:[]
            }
        },
        methods:{
            query(){

            },
            mockparameterTableColumns(){
                let data=[];
                const keyArr=['ID','name','datatype','orderNo'];
                const titleArr=['项目编码','项目名称','数据类型','顺序号'];
                data=util.renderTableNoColumn(data);
                data=util.renderTableNormalColumn(data,keyArr,titleArr);
                data.push({
                    key:"control",
                    title:"操作",
                    render:(h,params)=>{
                        return h('div',[
                            h('Button',{props:{type:"primary",size:"small"},style:{marginRight:'5px'},on:{click:()=>{this.resetOrder(params.index)}}},'清除顺序号'),
                            h('Button',{props:{type:"error",size:"small"},style:{marginRight:'5px'},on:{click:()=>{this.removeItem(params.index)}}},'删除'),
                            h('Button',{props:{type:"primary",size:"small"},on:{click:()=>{this.reviseItem(params.index)}}},'修改')
                        ])
                    }
                });
                return data
            },
            mockparameterTableData(){
                return util.mockblankrow()
            },
            mockCompanyList(){
                return util.mockCompanyList()
            },
            mockPlanList(){
                return util.mockCompanyList()
            },
            resetOrder(index){
                console.log("清除顺序号"+index)
            },
            removeItem(index){
                console.log("删除"+index)
            },
            reviseItem(index){
                console.log("修改"+index)
            }
        }
    }
</script>

<style scoped>

</style>