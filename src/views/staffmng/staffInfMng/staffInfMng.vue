<template>
    <div>
        <Row>
            <Col :md="4">
                <div style="padding: 10px">
        <Card>
            <p slot="title">维护公司选择</p>
            <div style="height:400px">
            <p><Tree ref="orgtree" :data="treedata" @on-select-change="showselectednode"></Tree></p>
            </div>
        </Card>
                </div>
            </Col>

            <Col :md="10">
                <div style="padding: 10px">
                <Card><div>
        <div id="query">
            <Form :model="query" :label-width=60 label-position="left" inline>
                <Row type="flex" justify="space-between">
                    <Col>
                        <p><FormItem prop="username" label="用户名:">
                            <Input type="text" v-model="query.username"/>
                        </FormItem></p>
                        <p>
                        <FormItem prop="mobile" label="手机号:">
                            <Input type="text" v-model="query.mobile"/>
                        </FormItem></p>
                    </Col>
                    <Col>
                        <p>
                        <FormItem prop="name" label="姓名:">
                            <Input type="text" v-model="query.name"/>
                        </FormItem></p>
                        <p><Row type="flex" justify="space-between"><Col>
                        <FormItem prop="station" label="台站:">
                        <Select v-model="query.station">
                            <Option v-for="item in stationList" :key="item.value" :value="item.value">{{item.title}}</Option>
                        </Select>
                        </FormItem></Col>
                            <Col>
                                <Button type="primary" @on-click="search">查询</Button></Col></Row></p>
                    </Col>
                </Row>

            </Form>
        </div>
        <div id="table">
            <Table :columns="tablecolumns" :data="tabledata" height=345></Table>
        </div></div></Card></div>
            </Col>

            <Col :md="10">
        <div style="padding: 10px">
            <Card>
                <p slot="title">维护人员信息</p>
                <div style="height:408px">
                <Row :gutter="12">
                    <Col span="12">
                        <p>用户名: {{staffdata.username}}</p></Col>
                    <Col span="12">
                        <p>姓名: {{staffdata.name}}</p></Col>
                </Row>
                <p>身份证号码: {{staffdata.userpid}}</p>
                <Row :gutter="12">
                    <Col>
                        <p>性别: {{staffdata.gender}}</p></Col>
                    <Col>
                        <p>民族: {{staffdata.race}}</p></Col>
                    <Col>
                        <p>出生日期: {{staffdata.DoB}}</p></Col>
                </Row>
                <p>身份证住址: {{staffdata.pidaddress}}</p>
                <Row :gutter="12">
                    <Col span="12">
                        <p>签发机关: {{staffdata.piddistributer}}</p></Col>
                    <Col span="12">
                        <p>有效期限: {{staffdata.pidvaliddate}}</p></Col></Row>
                <p>现居住地址: {{staffdata.address}}</p>
                <Row>
                    <Col span="8">
                        <p>维护公司: {{staffdata.company}}</p></Col>
                    <Col span="8">
                        <p>技术等级: {{staffdata.skillLevel}}</p></Col>
                    <Col span="8">
                        <p>状态: {{staffdata.status}}</p></Col></Row>
                <Row>
                    <Col span="12">
                        <p>联系邮箱: {{staffdata.email}}</p></Col>
                    <Col span="12">
                        <p>联系电话: {{staffdata.mobile}}</p></Col></Row>
                <Row>
                    <Col span="12">
                        <p>积分: {{staffdata.point}}</p></Col>
                    <Col span="12">
                        <p>基本工资: {{staffdata.basicSalary}}</p></Col></Row>
                <p>开户行: {{staffdata.accountBank}}</p>
                <p>账号: {{staffdata.account}}</p>
                <p>支付宝账号: {{staffdata.alipayAccount}}</p>
                <p>微信绑定: {{staffdata.wxid}}</p>
                <p>个人简历: {{staffdata.personalInf}}</p>
                <Button type="primary" long>身份证扫描件管理</Button>
                </div>
            </Card>
        </div></Col>
        </Row>
        <Row>
            <Col span="12">
                <div style="padding: 0 10px">
                    <Card>
                        <Row type="flex" justify="space-between">
                            <Col>
                    <Select placeholder="选择服务类别">
                        <Option v-for="item in tablelist" :key="item.value" :value="item.value">{{item.title}}</Option>
                    </Select>
                            </Col>
                            <Col>
                                <Button type="primary">重新设置</Button>
                            </Col>
                        </Row>
                        <Table :columns="stationTableColumn" :data="stationTableData" height=270></Table>
                    </Card>
                </div>
            </Col>
            <Col span="12">
                <div style="padding: 0 10px 0 10px">
                    <Card>
                        <Row type="flex" justify="space-between">
                            <Col><p>维护任务级别匹配信息</p></Col>
                            <Col><p><Button type="primary">重设任务级别</Button></p></Col>
                        </Row>
                        <Table :columns="staffTasklevelTableColumns" :data="staffTasklevelTableData" height=270></Table>
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "staffInfMng",
        data:function(){
            return{
                query:{
                    username:"",
                    name:"",
                    mobile:"",
                    station:"",
                },
                treedata:[
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
                                        children: []
                                    }
                                ]
                            }

                        ]
                    }
                ],
                stationList:[{value:"station1",title:"台站1"},{value:"station2",title:"台站2"},{value:"station3",title:"台站3"}],
                tablecolumns:[
                    {key:"username",title:"用户名"},
                    {key:"name",title:"姓名"},
                    {key:"oplevel",title:"技术等级"},
                    {key:"status",title:"人员审核状态"},
                    {key:"company",title:"维护公司"}
                    ],
                tablelist:[{value:"maintenance",title:"维护台站信息"},{value:"repair",title:"维修台站信息"},{value:"calibrationstation",title:"标定台站信息"}],
                stationTableColumn:[
                    {key:"No",title:"序号"},
                    {key:"stationID",title:"台站编号"},
                    {key:"stationName",title:"台站名称"},
                    {key:"department",title:"所属气象局"}],
                stationTableData:[{},{},{},{},{},{},{},{},{}],
                staffTasklevelTableColumns:[
                    {key:"No",title:"序号"},
                    {key:"maintenanceCategory",title:"维护类别"},
                    {key:"tasklevel",title:"任务级别"}],
                staffTasklevelTableData:[{},{},{},{},{},{},{}],
                tabledata:[{},{},{},{},{},{},{}],
                staffdata:{
                    username:"",
                    name:"",
                    password:"",
                    userpid:"",
                    gender:"",
                    race:"",
                    DoB:"",
                    pidaddress:"",
                    piddistributer:"",
                    pidvaliddate:"",
                    address:"",
                    company:"",
                    skillLevel:"",
                    status:"",
                    email:"",
                    mobile:"",
                    point:"",
                    basicSalary:"",
                    accountBank:"",
                    account:"",
                    alipayAccount:"",
                    wxid:"",
                    personalInf:"",
                    scanningfiles:""
                }
            }
        },
        methods:{
            showselectednode(){
                console.log(this.$refs.orgtree.getSelectedNodes())
            },
            search(){
                console.log(this.$data.query)
            }
        }
    }
</script>

<style scoped>

</style>