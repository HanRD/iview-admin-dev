<template>
    <div>
        <Card>
    <div v-cloak id="data" style="margin-bottom: 20px">
        <Row class="info" >
            <i-col :lg="3" :sm="6" v-for="item in indexdata" :key="item.value">
                <div style="padding: 5px" >
                    <infor-card
                    :id-name="item.name"
                    :end-val="item.sum"
                    color="#2d8cf0"
                    :intro-text="item.title"
                    :simplify="false"
                    ></infor-card>
                </div>
            </i-col>
        </Row>
    </div>
    <Form ref="querycontents" :model="querycontents" label-position="left" :label-width="80" inline>
        <FormItem prop="stationID" label="台站编号">
            <Input type="text" v-model="querycontents.stationID" placeholder="请输入台站编号">
            </Input>
        </FormItem>
        <FormItem prop="stationName" label="台站名">
            <Input type="text" v-model="querycontents.stationName" placeholder="请输入台站名">
            </Input>
        </FormItem>
        <FormItem prop="staffName" label="维护人姓名">
            <Input type="text" v-model="querycontents.staffName" placeholder="请输入维护人姓名">
            </Input>
        </FormItem>
        <FormItem prop="submittedby" label="提交人姓名">
            <Input type="text" v-model="querycontents.submittedby" placeholder="请输入提交人姓名">
            </Input>
        </FormItem>
        <FormItem prop="startDate" label="起始日期">
            <DatePicker type="date" placeholder="选择起始日期" v-model="querycontents.startDate"></DatePicker>
        </FormItem>
        <FormItem prop="endDate" label="结束日期">
            <DatePicker type="date" placeholder="选择结束日期" v-model="querycontents.endDate"></DatePicker>
        </FormItem>
        <FormItem prop="documentID" label="维护单编号">
            <Input type="text" v-model="querycontents.documentID" placeholder="维护单编号">
            </Input>
        </FormItem>
        <FormItem prop="documentstatus" label="状态">
            <Select v-model="querycontents.documentstatus">
                <Option value="1">待审核</Option>
                <Option value="2">待发布</Option>
                <Option value="3">已发布</Option>
                <Option value="4">处理中</Option>
                <Option value="5">提交中</Option>
                <Option value="6">已提交</Option>
                <Option value="7">完成</Option>
            </Select>
        </FormItem>
        <Button type="primary" @click="handleSubmit(querycontents)">搜索</Button>
    </Form>
    <div v-cloak id="resulttable" >
        <i-table ref="documenttable" style="margin-top:20px" highlight-row stripe :columns="tableheader" :data="tabledata" align="center">
        </i-table>
        <br>
        <i-button type="primary" @click="modal1 = true"><Icon type="ios-download-outline"></Icon> 导出表格数据</i-button>
        <i-button type="primary" @click="newdoc"><Icon type="plus"></Icon> 新增维护单</i-button>
        <Modal
                v-model="modal1"
                title="确认操作"
                @on-ok="ok"
                @on-cancel="cancel">
            <p>确定要将表格内容下载至本地么？</p>
        </Modal>
    </div>
    </Card>
    </div>
</template>

<script>
    import inforCard from "../home/components/inforCard.vue";
    import InforCard from "../home/components/inforCard";
    export default {
        components: {InforCard},
        data:function(){
            return{
                modal1:false,
                indexdata:[
                    {name:"total",title:"维护单总数",sum:9776},
                    {name:"waitforauth",title:"待审核",sum:1},
                    {name:"waitforpublish",title:"待发布",sum:811},
                    {name:"published",title:"已发布",sum:0},
                    {name:"processing",title:"处理中",sum:0},
                    {name:"submitting",title:"提交中",sum:27},
                    {name:"submitted",title:"已提交",sum:15},
                    {name:"finished",title:"已完成",sum:8922},
                ],
                querycontents:{
                    stationID:"",
                    stationName:"",
                    startDate:"",
                    endDate:"",
                    documentID:"",
                    documentstatus:"",
                    staffName:"",
                    submittedby:""
                },
                tableheader:[
                    {title:"台站",key:"stationName"},
                    {title:"维护人员姓名",key:"staffName"},
                    {title:"状态",key:"documentstatus",render:(h,params)=>{
                        const row = params.row;
                        let color,tip;
                        switch(parseInt(row.documentstatus)){
                            case 1:
                               color='orange';
                               tip='待审核';
                               break;
                            case 2:
                                color='orange';
                                tip='待发布';
                                break;
                            case 3:
                                color='blue';
                                tip='已发布';
                                break;
                            case 4:
                                color='blue';
                                tip='处理中';
                                break;
                            case 5:
                                color='blue';
                                tip='提交中';
                                break;
                            case 6:
                                color='yellow';
                                tip="已提交";
                                break;
                            case 7:
                                color='green';
                                tip='已完成';
                                break;
                        }
                        return h('Tag',{props:{type:'dot',color:color}},tip);
                        }},
                    {title:"计划开始时间",key:"startTime"},
                    {title:"操作",align:"center",render:(h,params)=>{
                            return h('div',[
                                h('Button',{
                                    props:{
                                        type:'primary',
                                        size:'small'
                                    },
                                    on:{
                                        click:()=>{
                                            this.show(params.index)
                                        }
                                    }
                                },"查看"),
                                h('Button',
                                    {
                                        props:{
                                            type: 'error',
                                            size: 'small'
                                        },on: {
                                            click: () => {
                                                this.remove(params.index)
                                            }
                                        }},"删除")])
                        }
                    }
                ],
                tabledata:[
                    {No:1,staffName:"A",stationName:"三洞齐洪水库站",documentstatus:"1",startTime:"2018-05-10 12:00:48"},
                    {No:2,staffName:"B",stationName:"三洞齐洪水库站",documentstatus:"2",startTime:"2018-05-10 12:00:48"},
                    {No:3,staffName:"C",stationName:"三洞齐洪水库站",documentstatus:"3",startTime:"2018-05-10 12:00:48"},
                    {No:4,staffName:"D",stationName:"三洞齐洪水库站",documentstatus:"4",startTime:"2018-05-10 12:00:48"},
                    {No:5,staffName:"D",stationName:"三洞齐洪水库站",documentstatus:"5",startTime:"2018-05-10 12:00:48"},
                    {No:6,staffName:"D",stationName:"三洞齐洪水库站",documentstatus:"6",startTime:"2018-05-10 12:00:48"},
                    {No:7,staffName:"D",stationName:"三洞齐洪水库站",documentstatus:"7",startTime:"2018-05-10 12:00:48"},
                 ],
            }

        },
        methods:{
            showclickedcard(data){
                console.log(data);
            },
            handleSubmit(data){
                console.log(data);
            },
            show(index){
                let query={type:'observe',documentdata:this.tabledata[index]};
                this.$router.push({
                    name: 'docdetail',
                    query:query
                })
            },
            remove(index){
                console.log(index)
            },
            ok(){

            },
            cancel(){

            },
            newdoc(){
                let query={type:'new'};
                this.$router.push({
                    name: 'docdetail',
                    query:query
                })
            }
        }
    }

</script>

<style scoped>

</style>