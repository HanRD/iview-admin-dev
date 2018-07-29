<template>
    <div>
        <div style="padding: 10px">
            <Card><Row type="flex" justify="space-between"><Col>
            <Form inline :model="querydata">
                <FormItem>
                    <Select v-model="querydata.operatename" placeholder="请选择操作类型">
                        <Option v-for="item in operateNameList" :key="item.value" :value="item.value">{{item.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem><Input type="text" v-model="querydata.userID" placeholder="请输入用户编码" /></FormItem>
                <FormItem><Input type="text" v-model="querydata.username" placeholder="请输入用户名" /></FormItem>
                <FormItem><Input type="text" v-model="querydata.operatedetail" placeholder="请输入操作明细" /></FormItem>
                <FormItem><DatePicker type="daterange" split-panels v-model="querydata.Date" placeholder="请选择起始结束日期" ></DatePicker></FormItem>
                <Button type="primary" @click="query">查询</Button>
            </Form></Col>
                <Col>
                    <div>
                        <Button type="error" @click="deleteLog">删除操作日志</Button>
                        <Button type="primary" @click="outputTable">导出表格数据</Button>
                    </div>
                </Col>
            </Row>
            <Table ref="logtable" :columns="systemLogTableColumns" :data="systemLogTableData"></Table>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "systemLogQuery",
        data:function(){
            return{
                operateNameList:this.mockOperateNameList(),
                querydata:{
                    operatename:"",
                    userID:"",
                    username:"",
                    operatedetail:"",
                    Date:[],
                },
                systemLogTableColumns:[{key:"No",title:"序号"},{key:"time",title:"操作时间"},{key:"oporg",title:"操作机构"},{key:"opstaff",title:"操作人员"},{key:"opname",title:"操作类型"},{key:"detail",title:"操作明细"}],
                systemLogTableData:this.mockSystemLogTableData(),

            }
        },
        methods:{
            mockOperateNameList(){
                let data=[];
                for(let i=0;i<10;i++){
                    data.push({
                        value:"operate"+i,
                        label:"操作"+i,
                    })
                }
                console.log(data);
                return data;
            },
            mockSystemLogTableData(){
                let data=[];
                for (let i=1;i<11;i++){
                    data.push({

                    })
                }
                return data
            },
            query(){
                console.log(this.querydata)
            },
            deleteLog(){
                console.log("删除日志")
            },
            outputTable(){
                this.$Modal.confirm(
                    {
                        title:"导出表格数据",
                        content:"确定要导出表格数据吗？",
                        onOk:this.downloadLogTableData,
                    }
                )
            },
            downloadLogTableData(){
                this.$refs.logtable.exportCsv({filename:"系统操作日志"})
            }
        }
    }
</script>

<style scoped>

</style>