<template>
    <div>
    <div style="padding: 10px;">
        <Card>
            <Table ref="table" :columns="systemParameterTableColumns" :data="systemParameterTableData" highlight-row @on-current-change="holdSelectedRow"></Table>
            <Button type="primary" @click="newParameter"><Icon type="md-add" /> 新增</Button>
            <Button id="reviseBtn" type="primary" @click="reviseParameter" disabled><Icon type="md-create" /> 修改</Button>
            <Button type="primary" @click="outputTableData"><Icon type="md-download" /> 导出表格数据</Button></Card>
    </div>
    <div>
        <Modal v-model="showmodal">
            <p slot="header">修改系统参数</p>
            <Form :model="systemParameterData">
                <FormItem><Input type="text" v-model="systemParameterData.name" readonly/></FormItem>
                <FormItem><Input type="text" v-model="systemParameterData.parameters" /></FormItem>
                <FormItem><Input type="text" v-model="systemParameterData.description" /></FormItem>
                <FormItem><Input type="text" v-model="systemParameterData.note" /></FormItem>
            </Form>
        </Modal>
    </div></div>
</template>

<script>
    export default {
        name: "systemParameterMng",
        data:function () {
            return{
                showmodal:false,
                systemParameterData:{
                  name:"",
                  parameters:"",
                  description:"",
                  note:""
                },
                systemParameterTableColumns:[{key:"No",title:"序号"},{key:"name",title:"名称"},{key:"description",title:"描述"},{key:"parameters",title:"数值"}],
                systemParameterTableData:this.mockTableData()
            }
        },
        methods:{
            mockTableData(){
                let data=[];
                for(let i=1;i<11;i++){
                    data.push({
                        No:i,
                        name:"参数"+i,
                        description:"",
                        parameters:Math.round(Math.random()*10000)
                    })
                }
                return data;
            },
            newParameter(){

            },
            reviseParameter(){
                this.showmodal=true
            },
            outputTableData(){
                this.$Modal.confirm(
                    {
                        title:"导出表格数据",
                        content:"确定要导出表格数据吗？",
                        onOk:this.downloadTableData,
                    }
                )
            },
            holdSelectedRow(params){
                document.getElementById('reviseBtn').removeAttribute('disabled');
                this.systemParameterData=params;
            },
            downloadTableData(){
                this.$refs.table.exportCsv({filename:"系统参数表格"})
            }
        }
    }
</script>

<style scoped>

</style>