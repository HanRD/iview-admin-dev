<template>
    <div>
    <div id="query">
        <Form :model="querydata" label-position="left" :label-width=70 inline>
            <FormItem prop="organization" label="维护公司:">
                <Select style="width:164px" v-model="querydata.organization">
                    <Option v-for="item in organizationlist" :value="item.value" :key="item.value">{{item.title}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="username" label="用户名:">
                <Input type="text" v-model="querydata.username" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem prop="staffname" label="姓名:">
                <Input type="text" v-model="querydata.staffname" placeholder="请输入维护人员姓名"></Input>
            </FormItem>
            <FormItem prop="staffpid" label="身份证号:">
                <Input type="text" v-model="querydata.staffpid" placeholder="请输入维护人员身份证号"></Input>
            </FormItem>
            <FormItem prop="date" label="起始结束时间:" :label-width=100>
                <DatePicker v-model="querydata.date" type="daterange" split-panels placeholder="选择起始结束日期"></DatePicker>
            </FormItem>
            <FormItem><Button type="primary" @click="submit(querydata)">搜索</Button></FormItem>
        </Form>
    </div>
    <div id="table">
        <Table border stripe :columns="columns" highlight-row :data="data"></Table>
        <Button @click="revisethisdoc()" id="btn1">修改</Button>
        <Button @click="newdocument()" id="btn2">预结算</Button>
        <Button @click="" id="btn3">结算</Button>
        <Button @click="" id="btn4">撤销</Button>
        <Button @click="" id="btn5">提请付款</Button>
        <Button @click="" id="btn6">输出</Button>
    </div>
            <Modal v-model="showmodal">

                        <p slot="header">{{modaltitle}}</p>
                        <Form ref="documentform" :model="documentdata" label-position="left" :label-width=70 >
                            <Row :gutter="12">
                                <Col span="12">
                                    <FormItem label='维护公司:'>
                                        <Select label='supident' v-model="defaultorganization" style="width:100%" @on-change="observechange" label-in-value=true>
                                            <Option v-for="item in organizationlist" :value="item.value" :key="item.value">{{ item.title }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label='用户名:'>
                                        <Select v-model="documentdata.username" width="100%">
                                            <Option v-for="item in stafflist" :value="item.value" :key="item.value">{{ item.title }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
</Row><Row :gutter="12">
                                <Col span="12">
                                    <FormItem prop="date" label="起始结束时间:">
                                        <DatePicker v-model="documentdata.date" type="daterange" split-panels placeholder="选择起始结束日期"></DatePicker>
                                    </FormItem>
                                </Col>

                                <Col span="12">
                                    <FormItem label='基本工资:'>
                                        <Input v-model="documentdata.basicsalary" @on-change="calculatepayment"></Input>
                                    </FormItem>
                                </Col>
                        </Row>
                            <Row :gutter="12">
                                <Col span="12">
                                    <FormItem label='服务质量奖励:'>
                                        <Input v-model="documentdata.qosbonus" @on-change="calculatepayment"></Input>
                                    </FormItem>
                                </Col>

                                <Col span="12">
                                    <FormItem label='个税:'>
                                        <Input v-model="documentdata.personaltax" @on-change="calculatepayment"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="12">
                                <Col span="12">
                                    <FormItem label='补贴:'>
                                        <Input v-model="documentdata.allowance" @on-change="calculatepayment"></Input>
                                    </FormItem>
                                </Col>

                                <Col span="12">
                                    <FormItem label='发单管理奖励:'>
                                        <Input v-model="documentdata.mngbonus" @on-change="calculatepayment"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                                    <FormItem label='实发工资合计:'>
                                        <Input v-model="documentdata.payment" readonly></Input>
                                    </FormItem>

                            <FormItem label='备注:'>
                                <Input type="textarea" v-model="documentdata.note"></Input>
                            </FormItem>
                            <Button type="primary" @on-click="">提交</Button>
                            <Button type="ghost" @on-click="">取消</Button>
                        </Form>
         </Modal>
        </div>
</template>

<script>
    export default {
        name: "staffSalaryMng",
        data:function(){
            return{
            defaultorganization:'supident',
            showmodal:false,
            modaltitle:"嗯哼!",
            columns:[
                {title:"用户名",key:"username"},
                {title:"维护人员姓名",key:"staffname"},
                {title:"身份证号",key:"staffpid"},
                {title:"基本工资",key:"basicsalary"},
                {title:"维护工资",key:"maintenancesalary"},
                {title:"补贴",key:"allowance"},
                {title:"服务质重奖励",key:"qosbonus"},
                {title:"发单管理奖励",key:"mngbonus"},
                {title:"奖惩金额",key:"bonusamount"},
                {title:"个税",key:"personaltax"},
                {title:"实发工资合计",key:"payment"},
                {title:"开始时间",key:"startdate"},
                {title:"结束时间",key:"enddate"},
                {title:"结算状态",key:"status"},
                {title:"结算备注",key:"note"},
                ],
            data:[],
            documentdata:{
                organization:"",
                username:"",
                date:"",
                startdate:"",
                enddate:"",
                basicsalary:0,
                maintenancesalary:0,
                qosbonus:0,
                bonusamount:0,
                personaltax:0,
                payment:0,
                allowance:0,
                mngbonus:0,
                note:""
            },
            organizationlist:[
                {value:"supident",title:"天识科技有限公司"},
                {value:"test",title:"测试公司"},
                {value:"coop1",title:"公司A"},
                {value:"coop2",title:"公司B"},
                {value:"coop3",title:"公司C"},
                {value:"coop4",title:"公司D"},
                {value:"coop5",title:"公司E"},
                ],
            stafflist:[
                ],
            stafflist1:[
                {value:"staff1",title:"员工A"},
                {value:"staff2",title:"员工B"},
                {value:"staff3",title:"员工C"},
                {value:"staff4",title:"员工D"},
                {value:"staff5",title:"员工E"},
                ],
            stafflist2:[
                {value:"staff6",title:"员工あ"},
                {value:"staff7",title:"员工い"},
                {value:"staff8",title:"员工う"},
                {value:"staff9",title:"员工え"},
                {value:"staff10",title:"员工お"},
                {value:"staff11",title:"员工か"},
                {value:"staff12",title:"员工き"},
                ],
            statuslist:[
                {value:"status1",title:"预结算"},
                {value:"status2",title:"结算"},
                {value:"status3",title:"撤销"},
                {value:"status4",title:"提请付款"},
                {value:"status5",title:"付款中"},
                {value:"status6",title:"已付款"},
                ],
                querydata:{
                    organization:"",
                    username:"",
                    staffname:"",
                    staffpid:"",
                    date:"",
                    status:"",
                },
                organizationlist:[
                    {value:"supident",title:"天识科技有限公司"},
                    {value:"test",title:"测试公司"},
                    {value:"coop1",title:"公司A"},
                    {value:"coop2",title:"公司B"},
                    {value:"coop3",title:"公司C"},
                    {value:"coop4",title:"公司D"},
                    {value:"coop5",title:"公司E"},
                ],
                statuslist:[
                    {value:"status1",title:"预结算"},
                    {value:"status2",title:"结算"},
                    {value:"status3",title:"撤销"},
                    {value:"status4",title:"提请付款"},
                    {value:"status5",title:"付款中"},
                    {value:"status6",title:"已付款"},
                ]

        }
    },methods:{
            newdocument(){
                this.$data.showmodal=false;
                this.$data.modaltitle="新增预结算信息"
                if(!this.$data.showmodal){
                    this.$data.showmodal=true;}
                else{console.log("switching");this.$refs['documentform'].resetFields();}

            },
            revisethisdoc(){
                this.$data.modaltitle="修改预结算信息"
                if(!this.$data.showmodal){
                    this.$data.showmodal=true;}
                else{console.log("switching");this.$refs['documentform'].resetFields();}
            },
            observechange(value){
                console.log(value)
                if (value.value=='supident'||value.value=='test'||value.value=='coop1') {
                    this.$data.stafflist=this.$data.stafflist1;
                }
                if (value.value=='coop2'||value.value=='coop3'||value.value=='coop4') {
                    this.$data.stafflist=this.$data.stafflist2;
                }
                if (value.value=='coop4'){
                    this.$data.stafflist=this.$data.stafflist1.concat(this.$data.stafflist2);
                }
                if (value.value=='coop5'){
                    this.$data.stafflist=[];
                }
            },
            calculatepayment(){
                this.$data.documentdata.payment=parseFloat(this.$data.documentdata.basicsalary)+parseFloat(this.$data.documentdata.maintenancesalary)+parseFloat(this.$data.documentdata.qosbonus)+parseFloat(this.$data.documentdata.bonusamount)+parseFloat(this.$data.documentdata.allowance)+parseFloat(this.$data.documentdata.mngbonus)-parseFloat(this.$data.documentdata.personaltax)
            },
            ok(){
                if(this.$data.documentdata.date[0]&&this.$data.documentdata.date[1]){
                    this.$data.documentdata.startdate=this.$data.documentdata.date[0].toLocaleDateString();
                    this.$data.documentdata.enddate=this.$data.documentdata.date[1].toLocaleDateString();
                }
                this.$data.documentdata.status=this.$data.statuslist[0].title;
                this.$data.data.push(this.$data.documentdata)
            },
            cancel(){
                this.$refs['documentform'].resetFields();
            },
            submit(data){
                console.log(data)
            }
        },
        mounted(){
            this.$data.stafflist=this.$data.stafflist1
        }
        }

</script>

<style scoped>

</style>