<template>
    <div>
        <div style="padding: 10px;background: #eee">
            <Card>
        <Row type="flex" justify="space-between">
            <Col>
        <Form :model="planquery" inline>
            <FormItem>
                <Select v-model="companyfilter" @on-change="filterPlanTable" >
                    <Option v-for="item in companyList" :key="item.value" :value="item.value" placeholder="请选择维护公司">{{item.label}}</Option>
                </Select>
            </FormItem>
            <FormItem><Input v-model="planquery.ID" placeholder="请输入方案编号" /></FormItem>
            <FormItem><Input v-model="planquery.name" placeholder="请输入方案名称" /></FormItem>
            <Button type="primary" @click="queryplan">查询</Button>
        </Form></Col>
            <Col>
                <Button type="primary" @click="outputPlanTable">导出</Button>
                <Button type="primary" @click="addNewPlan">新增</Button>
            </Col>
        </Row>
            <Table :columns="plantableColumns" :data="plantabledata"></Table>
            </Card></div>
        <Modal v-model="showModal" :closable="false" :mask-closable="false">
            <div slot="header">
                <Row type="flex" justify="space-between">
                    <Col>
                        <p>{{modalTitle}}</p>
                    </Col>
                    <Col>
                        <Tag v-if="plandata.status===1" color="green">启用</Tag>
                        <Tag v-else-if="plandata.status===0" color="red">禁用</Tag>
                    </Col>
                </Row>
            </div>
            <Form :label-width=80 label-position="left" :model="plandata">
                <FormItem label="模板文件:"><Input type="text" v-model="plandata.templatefile"/></FormItem>
                <FormItem label="名称:"><Input type="text" v-model="plandata.name"/></FormItem>
                <FormItem label="状态:" v-if="modaltype===1">
                    <Select v-model="plandata.status">
                        <Option :value="1">启用</Option>
                        <Option :value="0">禁用</Option>
                    </Select>
                </FormItem>
                <FormItem label="备注:"><Input type="textarea" v-model="plandata.note" /></FormItem>
            </Form>
            <p>应用台站</p>
            <Table :columns="applystationTableColumn" :data="applystationTableData" ></Table>
            <div slot="footer">
                <Button type="primary" @click="closeModal">返回</Button>
                <Button type="primary" @click="submitItem">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import util from '../../../libs/util.js'
    export default {
        name: "inspectionPlanMng",
        data:function () {
            return{
                modaltype:1,
                modalTitle:"",
                showModal:false,
                companyList:this.mockCompanyList(),
                plantableColumns:this.mockplantablecolumns(),
                plantabledata:this.mockplantabledata(),
                companyfilter:"",
                planquery:{
                    ID:"",
                    name:""
                },
                plandata:{
                    id:"",
                    name:"",
                    templatefile:"",
                    status:1,
                    note:"",
                    appliedStation:[],
                },
                applystationTableColumn:this.mockapplystationTableColumn(),
                applystationTableData:this.mockapplystationTableData(),

            }
        },
        methods:{
            //生成公司列表
            mockCompanyList(){
                const valueArr=[];
                const labelArr=[];
                let data=[];
                for(let i=0;i<valueArr.length;i++){
                    data.push({
                        value:valueArr[i],
                        label:labelArr[i]
                    });
                }
                return data
            },
            mockapplystationTableColumn(){
              let data=[];
              const keyArr=["bsid","bsname","buname"];
              const titleArr=['台站编号',"台站名称","所属气象局"];
              data=util.renderTableNoColumn(data);
              data=util.renderTableNormalColumn(data,keyArr,titleArr);
              return data;
            },
            mockapplystationTableData(){
                return util.mockblankrow();
            },
            mockplantablecolumns(){
                let data=[];
                const keyArr=['ID','name','dataIndex'];
                const titleArr=['编号','名称','数据索引'];
                data=util.renderTableNoColumn(data);
                data=util.renderTableNormalColumn(data,keyArr,titleArr);
                data.push({
                    key:"control",
                    title:"操作",
                    render:(h,params)=>{
                        return h('div',[
                            h('Button',{props:{type:"primary",size:"small"},style:{marginRight:'5px'},on:{click:()=>{this.downloadplan(params.index)}}},"下载"),
                            h('Button',{props:{type:"primary",size:"small"},on:{click:()=>{this.reviseplan(params.index)}}},"修改")
                        ])
                    }
                });
                return data
            },
            mockplantabledata(){
                let data=[];
                for(let i=0;i<10;i++){
                    data.push({
                        //表格数据条目
                        id:"",
                        name:"",
                        templatefile:"",
                        status:"",
                        note:"",
                        appliedStation:[],
                    })
                }
                return data;
            },
            filterPlanTable(){

            },
            queryplan(){

            },
            outputPlanTable(){

            },
            addNewPlan(){

            },
            downloadplan(index){

            },
            reviseplan(index){
                this.showModal=true;
                this.modalTitle="修改巡检方案"
            },
            closeModal(){
                console.log('关闭弹窗')
            },
            submitItem(){
                console.log('提交数据')
            }
        }
    }
</script>

<style scoped>

</style>