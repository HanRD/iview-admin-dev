<template>
    <div><Row><Col :lg="4" :sm="8">
        <div style="background:#eee;padding: 10px" >
            <Card shadow :bordered="false"><p slot="title">机构选择</p>
                <div style="height:407px;overflow: auto">

                    <p><Tree ref="orgtree" :data="treedata" @on-check-change="showcheckednodes" show-checkbox></Tree></p></div>
            </Card>
        </div>
    </Col>
        <Col :lg="20" :sm="16">
            <div style="background:#eee;padding: 10px">
                <Form :model="querydata" :label-width="80" label-position="left" inline>
                    <Row>
                        <Col :lg="3" :sm="4" :xs="5">
                            <Input type="text" v-model="querydata.keyword" placeholder="请输入搜索内容"></Input></Col>
                        <Col :lg="3" :sm="4" :xs="5"><Select v-model="querydata.oplevel" width="100%" placeholder="操作级别">
                            <Option v-for="item in oplevellist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select></Col>
                        <Col :lg="3" :sm="4" :xs="5"><Button type="primary" icon="ios-search" @click="submit(querydata)">查询</Button></Col>
                        <Col :lg="{span:1,offset:13}" :sm="{span:2,offset:8}" :xs={span:2,offset:5}><Button type="primary" icon="archive" @click="output()"></Button></Col>
                        <Col :lg="{span:1}" :sm="{span:1}" :xs={span:1}><Button type="primary" icon="plus-round" @click="newdata()"></Button></Col>
                    </Row>
                </Form>
                <div><Table ref="table" border stripe :columns="columns" highlight-row :data="tabledata" height="459" @on-current-change="holdclickedrow"></Table>
                </div>
            </div></Col><Col></Col></Row>
        <Modal
                v-model="modal1"
                title="确认操作"
                @on-ok="ok"
                @on-cancel="cancel">
            <p>确定要将表格内容下载至本地么？</p>
        </Modal>
        <Modal v-model="modal2" @on-ok="submitinformation" @on-calcel="abandonedit" :closable="false" :mask-closable="false">
            <p slot="header" style="color:#308ef0;text-align:center">
                <span>{{modal2title}}</span>
            </p>
            <Form :label-width="80" label-position="left">
                <FormItem label="用户编码"><Input type="text" v-model="newuserdata.userID" placeholder=""></Input></FormItem>
                <Row id=""><Col span="8">
                    <FormItem label="姓名"><Input type="text" v-model="newuserdata.name" placeholder=""></Input></FormItem></Col><Col span="15" offset="1">
                    <FormItem label="手机号码"><Input type="text" v-model="newuserdata.mobile" placeholder=""></Input></FormItem></Col><Col span="24">
                    <FormItem label="身份证号"><Input type="text" v-model="newuserdata.userPID" placeholder=""></Input></FormItem></Col></Row>
                <Row><Col span="11">
                    <FormItem label="登录密码"><Input type="password" v-model="newuserdata.password" placeholder="请输入密码"></Input></FormItem></Col>
                    <Col span="12" offset="1">
                        <FormItem label="确认密码"><Input type="password" v-model="newuserdata.confirmpassword" placeholder="请重复密码"></Input></FormItem></Col>

                </Row>
                <FormItem label="操作级别"><Select v-model="newuserdata.oplevel" width="100%" placeholder="操作级别">
                    <Option v-for="item in oplevellist" :key="item.value" :value="item.label">{{ item.label }}</Option>
                </Select></FormItem>
                <FormItem label="微信"><Input type="text" v-model="newuserdata.wxid" placeholder=""></Input></FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "systemOperatorMng",
        data(){
            return{
                modal1:false,
                modal2:false,
                modal2title:"",
                querydata:{
                    keyword:"",
                    oplevel:""
                },
                oplevellist:[
                    {value:"1",label:"一级"},
                    {value:"2",label:"二级"},
                    {value:"3",label:"三级"},
                    {value:"4",label:"四级"},
                ],
                columns:[
                    {title:"序号",key:"No"},
                    {title:"用户编码",key:"userID"},
                    {title:"身份证号",key:"userPID"},
                    {title:"姓名",key:"name"},
                    {title:"手机号码",key:"mobile"},
                    {title:"操作级别",key:"oplevel"},
                    {title:"微信",key:"wxid"},
                ],
                tabledata:[],
                newuserdata:{
                    No:"",
                    userID:"",
                    userPID:"",
                    mobile:"",
                    name:"",
                    password:"",
                    confirmpassword:"",
                    oplevel:"",
                    wxid:""
                },
                userdata:{
                    No:"",
                    userID:"",
                    userPID:"",
                    mobile:"",
                    name:"",
                    password:"",
                    confirmpassword:"",
                    oplevel:"",
                    wxid:""
                },
                treedata:[{title:'我去修管理系统',
                    expand: true,
                    children: [
                        {
                            title: '中国气象局',
                            expand: true,
                            children: [
                                {
                                    title: '广东市气象局',
                                    expand: true,
                                    children: [
                                        {
                                            title: '茂名市气象局',
                                            expand: true,
                                            children: [
                                                {title: '化州市气象局'}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    title: '四川省气象局',
                                    expand: true,
                                    children: [
                                        {
                                            title: '资阳市气象局',
                                            expand: true,
                                            children: [
                                                {title: '雁江区气象局'},
                                                {title: '乐至县气象局'},
                                                {title: '安岳县气象局'},
                                            ]
                                        },
                                        {
                                            title: '眉山市气象局',
                                            checked:true,
                                            children:[]
                                        }
                                    ]
                                }

                            ]
                        }]
                }
                ]
            }
        },
        methods:{
            holdclickedrow(data){
                selectedrow=data;
                // document.getElementById('observebtn').removeAttribute('disabled');
                console.log(selectedrow);
            },
            showcheckednodes(){
                console.log(this.$refs.orgtree.getCheckedNodes())
            },
            submit(data){
                console.log(data)
            },
            output(){
                this.$data.modal1=true
            },
            ok(){
                this.$refs.table.exportCsv({filename:"系统操作人员信息表.csv"})
            },
            cancel(){

            },
            newdata(){
                console.log("create new operator")
                this.$data.modal2title="新增系统操作员"
                this.$data.modal2=true
            },
            submitinformation(){
                console.log(this.$data.newuserdata)
                this.$data.tabledata.push(this.$data.newuserdata)
                this.$data.newuserdata=this.$data.userdata
            },
            abandonedit(){

            }
        }

    }
</script>

<style scoped>

</style>