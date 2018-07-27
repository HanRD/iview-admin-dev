<template>
    <div id="">
        <Row>
            <Col :md="4">
    <div style="background:#eee;padding: 10px">
        <Card shadow :bordered="false">
            <div class="scrollablecontent" style="height:250px;overflow:auto">
                <p slot="title"><b>气象局选择</b></p>
                <p><Tree ref="orgtree" :data="treedata" @on-select-change="showcheckednodes"></Tree></p>
            </div>
        </Card>
    </div>
            </Col>
    <Col :md="10" >
        <div style="background:#eee;padding:10px">
            <Card shadow :bordered="false">
            <div style="height:250px">
                <p slot="title"><b>气象局信息明细</b></p>
                <p>编码:{{data.ID}}</p>
                <p>省属/直辖市:{{data.province}}</p>
                <p>名称:{{data.name}}</p>
                <p>地址:{{data.address}}</p>
                <p>上级气象局:{{data.upperbranch}}</p>
                <Row>
                    <Col span="12">
                <p>联系人1:{{data.contact.name1}}</p>
                <p>联系电话1:{{data.contact.mobile1}}</p>
                <p>联系邮箱1:{{data.contact.email1}}</p></Col>
    <Col span="12">
        <p>联系人2:{{data.contact.name2}}</p>
        <p>联系电话2:{{data.contact.mobile2}}</p>
        <p>联系邮箱2:{{data.contact.email2}}</p>
    </Col>
</Row>
    <p>合同名称:{{data.contractname}}</p>
    <p>合同编号:{{data.contractID}}</p>
    <Row>
        <Col span="12"><p>合同开始日期:{{data.contractduration.startdate}}</p></Col>
        <Col span="12"><p>合同结束日期:{{data.contractduration.enddate}}</p></Col></Row>
</div>
    </Card>
        </div>
    </Col>
    <Col :md="10" >
        <div style="background:#eee;padding:10px"><Card shadow :bordered="false">
            <div style="height:250px">
                <p slot="title"><b>代维报告信息</b></p>
                <Row><Col span="8"><DatePicker v-model="reportquery.date" type="daterange" split-panels placeholder="选择起始结束日期"></DatePicker></Col>
                    <Col span="2" offset="10"><Button type="primary" @on-click="download">下载</Button></Col>
                    <Col span="2"><Button type="primary" @on-click="output">输出</Button></Col>
                    <Col span="2"><Button type="primary" @on-click="remake">重做</Button></Col></Row>
                <Table border ref="reporttable" stripe :columns="reportcolumn" highlight-row :data="reportdata" height="200"></Table></div>
        </Card></div>
    </Col>
    </Row>
    <div style="background:#eee;padding:10px"><Card shadow :bordered="false">
        <p slot="title"><b>下辖台站信息</b></p>
        <Table border stripe :columns="tablecolumn" highlight-row :data="tabledata"></Table></Card></div>
    </div>
</template>

<script>
    export default {
        name: "departmentInfMng",
        data:function(){
            return{
                data:{            //气象局信息数据
                    ID:"CMA************",
                    province:"四川省",
                    name:"四川省气象局",
                    address:"四川省",
                    upperbranch:"中国气象局",
                    contact:{name1:"张XX",name2:"李XX",mobile1:"12312312321",mobile2:"32132123232",email1:"123@wqx.com",email2:"asd@123.com"},
                    contractname:"合同1",
                    contractID:"2232131234512",
                    contractduration:{startdate:"2018-01-01",enddate:"2018-12-31"}
                },
                stationDataQuery:{
                    stationID:"",
                    province:"",
                    organization:"",
                    maintenanceOrg:"",
                    maintenanceStaff:""
                },
                reportquery:{
                    date:"",
                },
                reportcolumn:[
                    {title:'气象局',key:'organization'},
                    {title:'时间',key:'time'},
                    {title:'状态',key:'status'},
                    {title:'备注',key:'note'}
                ],
                reportdata:[{},{},{},{},{}],
                stationData:{
                    stationID:"",
                    stationName:"",
                    Province:"",
                    address:"",
                    belonging:"",
                    longitude:"",
                    latitude:"",
                    maintenanceCost:"",
                    maintenanceOrg:"",
                    status:"",
                    initiateDate:"",
                    abandonDate:"",
                    inspectionInterval:"",
                    latestMaintenanceDate:"",
                    isBackbone:"",
                    description:"",
                    photograph:"",
                    productModel:"",
                    installDate:"",
                    dueDate:"",
                    examineType:""
                },
                tablecolumn:[
                    {title:'编号',key:'stationID'},
                    {title:'名称',key:'stationName'},
                    {title:'省份',key:'province'},
                    {title:'地址',key:'address'},
                    {title:'所属气象局',key:'belonging'},
                    {title:'经度',key:'longitude'},
                    {title:'纬度',key:'latitude'},
                    {title:'总维价格',key:'maintenanceCost'},
                    {title:'状态',key:'status'},
                    {title:'启用时间',key:'initiateDate'},
                    {title:'停用时间',key:'abandonDate'},
                    {title:'维护周期',key:'inspectionInterval'},
                    {title:'最近维护任务',key:'latestMaintenanceDate'},
                    {title:'图片',key:'photograph'},
                    {title:'装配产品',key:'productModel'},
                    {title:'安装日期',key:'installDate'},
                    {title:'过保日期',key:'dueDate'},
                    {title:'考核类型',key:'examineType'},
                ],
                tabledata:[],
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
                ]

            }
        },
        methods:{                 //主体模块方法
            showcheckednodes(){
                console.log(this.$refs.orgtree.getCheckedNodes())
            },
            output(){
                console.log("output")
            },
            download(){
                this.$refs.reporttable.exportCsv({filename:"代维报告表.csv"})
            },
            remake(){
                console.log("output")
            }
        }
    }
</script>

<style scoped>
    .scrollablecontent::-webkit-scrollbar{
        display:none
    }
</style>