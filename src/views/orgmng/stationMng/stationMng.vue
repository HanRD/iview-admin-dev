<template xmlns:Tree="http://www.w3.org/1999/html">
    <div><Row>
        <Col :lg="4">
            <div id="tree">
                <div class="modelblock">
                    <Card>
                        <p slot="title">气象局选择</p>
                        <div style="height:350px;overflow: auto">
                            <Tree :data="treedata"></Tree>
                        </div>
                    </Card>
                </div>
            </div>
        </Col>
        <Col :lg="20">
        <div class="modelblock">
            <Card>
        <div id="query">
            <Form inline>
                <FormItem>
                    <Select placeholder="请选择考核类型">
                    <Option v-for="item in examineTypelist" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem><Input type="text" placeholder="请输入台站号" /></FormItem>
                <FormItem><Input type="text" placeholder="请输入台站名称" /></FormItem>
            </Form>
        </div>
                <div id="table"><Table :columns="stationTableColumn" :data="stationTableData" v-bind:border="true" height=344 ></Table></div></Card></div></Col>
    </Row>
        <div id="detail">
            <Row>
                <Col :lg="12">
            <div class="modelblock">
                <Card>
                    <p slot="title">
                        <Row type="flex" justify="space-between">
                        <Col>台站信息明细</Col>
                            <Col>
                    <Tag v-if="stationData.isBackbone==true" color="yellow">骨干站</Tag>
                    <Tag v-else>非骨干站</Tag>
                            <Tag v-if="stationData.status==0" color="red">禁用</Tag>
                                <Tag v-else color="green">正常</Tag></Col>
                        </Row></p>
                    <div>
                        <Row>
                            <Col span="8">
                                <p>台站编号: {{stationData.stationID}}</p></Col>
                            <Col span="16">
                                <p>台站名称: {{stationData.stationName}}</p></Col></Row>
                        <Row type="flex">
                            <Col span="8">
                                <p>所在省份: {{stationData.Province}}</p></Col>
                            <Col span="8">
                                <p>地址: {{stationData.address}}</p></Col>
                            <Col span="8">
                                <p>所属气象局: {{stationData.belonging}}</p></Col>
                        </Row>
                        <Row>
                            <Col span="8">
                                <p>基本维护价格: {{stationData.maintenanceCost}}</p></Col>
                            <Col span="8">
                                <p>启用时间: {{stationData.initiateDate}}</p></Col>
                            <Col span="8">
                                <p>停用时间: {{stationData.abandonDate}}</p></Col></Row>
                        <p>日常巡检周期: {{stationData.inspectionInterval}}</p>
                        <p>最后一次维保日期: {{stationData.latestMaintenanceDate}}</p>
                        <p>考核类型: {{stationData.examineType}}</p>
                        <p>台站描述: {{stationData.description}}</p>
                        <p>台站图片: {{stationData.photograph}}</p>
                        <p>自动站产品型号: {{stationData.productModel}}</p>
                        <p>自动站安装日期: {{stationData.installDate}}</p>
                        <p>过保日期: {{stationData.dueDate}}</p>
                    </div>
                </Card>
            </div>
                </Col>
                <Col :lg="12"><div class="modelblock">
                    <Card>
                        <p slot="title">气象产品设备装配信息</p>
                        <Table :columns="productTableColumns" :data="productTableData" v-bind:border="true"></Table>
                    </Card>
                </div></Col>
            </Row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "stationMng",
        data:function(){
           return{
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
               stationData:{
                    No:"",
                    stationID:"",
                    stationName:"",
                    Province:"",
                    address:"",
                    belonging:"",
                    longitude:"",
                    latitude:"",
                    maintenanceCost:"",
                    maintenanceOrg:"",
                    status:1,
                    initiateDate:"",
                    abandonDate:"",
                    inspectionInterval:"",
                    latestMaintenanceDate:"",
                    isBackbone:true,
                    description:"",
                    photograph:"",
                    productModel:"",
                    installDate:"",
                    dueDate:"",
                    examineType:"",
                },
               productTableColumns:[
                   {key:"No",title:"序号"},
                   {key:"productID",title:"设备序列号"},
                   {key:"productStandard",title:"型号规格"},
                   {key:"dateOfManufacture",title:"出厂日期"},
                   {key:"maintenanceDate",title:"保修日期"},
                   {key:"installDate",title:"安装时间"}
               ],
               productTableData:this.mockProductTableData(),

               examineTypelist:[{value:"type1",label:"国考"},{value:"type2",label:"省考"},{value:"type3",label:"非考"}],
               stationTableColumn:[
                   {key:"No",title:"序号",width:80},
                   {key:"stationID",title:"台站编号",width:120},
                   {key:"stationName",title:"台站名称"},
                   {key:"Province",title:"省属",width:120},
                   {key:"maintenanceOrg",title:"维护公司"}],
               stationTableData:this.mockStationTableData(),
           }
        },
        methods:{
            mockStationTableData(){
                let data=[];
                for (let i=0;i<10;i++){
                data.push({
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
                })}
                return data;
            },
            mockProductTableData(){
                let data=[];
                for (let i=0;i<10;i++){
                    data.push(
                        {
                            //自动站产品
                        }
                    )
                }
                return data;
            }
        }
    }
</script>

<style scoped>
    .modelblock{
        padding:10px
    }
</style>