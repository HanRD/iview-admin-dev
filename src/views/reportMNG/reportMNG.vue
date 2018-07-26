<template>
    <div>
    <div>
                <div style="background:#eee;padding: 10px">
                    <Card shadow>
                        <p slot="title">查询报障信息</p>
                        <div id="query">
                            <Form :model="querydata" :label-width="80" label-position="left" inline>
                                <Row>
                                    <Col span="10">
                                        <FormItem label="台站:"><Input v-model="querydata.stationName"></Input></FormItem></Col>
                                    <Col span="10">
                                        <FormItem label="提交日期:"><date-picker v-model="querydata.date" type="daterange" split-panels placeholder="选择起始结束日期"></date-picker></FormItem></Col>
                                    <Col span="10">
                                        <FormItem label="报障方式:"><Input v-model="querydata.submittype"></Input></FormItem></Col>
                                    <Col span="8">
                                        <FormItem label="提交人姓名:"><Input v-model="querydata.submitBy.name"></Input></FormItem></Col>
                                    <Col span="2">
                                        <Button type="primary" @click="submit(querydata)">搜索</Button></Col>

                                </Row>
                            </Form>
                        </div>
                        <div id="table"><Table border stripe :columns="columns" highlight-row :data="data" height="280"></Table></div>
                    </Card>
                </div>
                <div width="100%" id="detail"></div>
    </div>



        <div style="background:#eee;padding: 10px">

            <Card shadow><p slot="title">报障信息明细</p>
                <div style="height:394px">
                    <p>报障方式: {{detaildata.reportmethod}}</p>
                    <p><Row>
                        <Col span="8">编号：{{detaildata.id}}</Col>
                        <Col span="8">台站号：{{detaildata.stationID}}</Col>
                        <Col span="8">台站名：{{detaildata.stationName}}</Col>
                    </Row></p>
                    <p><div width="100%" id="container">{{detaildata.coordinate}}</div></p>
                    <p>地址：{{detaildata.address}}</p>
                    <p>站点类型：{{detaildata.stationtype}}</p>
                    <p>故障现象描述：{{detaildata.description}}</p>
                    <p>故障类型：{{detaildata.faulttype}}</p>
                    <p>故障分析(可能原因、部位)：{{detaildata.analyze}}</p>
                    <p>维修工具、备件：{{detaildata.tools}}</p>
                    <p>维护时间要求：{{detaildata.timedemand}}</p>
                    <p>备注：{{detaildata.note}}</p>
                    <p><Row>
                        <Col span="12">提交人员：{{detaildata.submitBy}}</Col>
                        <Col span="12">提交时间：{{detaildata.submittime}}</Col>
                    </Row></p>
                    <p>照片:
                    <div style="margin-left:10px"><a target="_blank" href="/src/images/cropper-test.png"><img src="/src/images/cropper-test.png" height="144px"alt=""></a></div>
                    </p></div>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reportMNG",
        data:function(){
            return{
                querydata:{
                    stationName:"",
                    stationID:"",
                    submitdate:"",
                    startdate:"",
                    enddate:"",
                    submittype:"",
                    submitBy:{name:"",ID:""},

                },
                columns:[
                    {title:'序号',key:''},
                    {title:'编号',key:''},
                    {title:'报障台站号',key:''},
                    {title:'状态',key:''},
                    {title:'提交人',key:''},
                    {title:'提交时间',key:''},
                ],
                data:[{},{},{},{},{},{}],
                detaildata:{
                    reportmethod:"监测线上报障",
                    upgradedata:{by:"",date:"",upgradefrom:""},
                    id:"MRF00000382",
                    stationID:"S1445",
                    stationName:"清流",
                    coordinate:"",
                    address:"新都区清流镇农业科技园区",
                    stationtype:"六要素",
                    description:"无数据",
                    faulttype:"其它故障",
                    analyze:"",
                    tools:"",
                    timedemand:"",
                    note:"",
                    submitBy:"879011(赵俊)",
                    submittime:"2018年05月30日08时48分",
                    photograph:"../images/sampleimg.png",
                }
            }
        },
        methods:{
            submit(data){
                console.log(data)
            }
        }
    }
</script>

<style scoped>

</style>