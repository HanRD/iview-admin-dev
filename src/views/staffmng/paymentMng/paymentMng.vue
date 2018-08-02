<template>
    <div>
        <div style="padding: 10px;background: #eee;">
            <Card>
                <div>
                    <Form :model="paymentquery" inline>
                        <Row type="flex" justify="space-between">
                            <Col>
                        <FormItem>
                            <Select v-model="paymentquery.company" placeholder="请选择维护公司">
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Input v-model="paymentquery.staffname" placeholder="请输入维护人员姓名" />
                        </FormItem>
                        <FormItem>
                            <DatePicker v-model="paymentquery.daterange" type="daterange" split-panels placeholder="请选择起始结束日期"></DatePicker>
                        </FormItem>
                        <FormItem>
                            <Select v-model="paymentquery.status" placeholder="请选择付款状态">
                            </Select>
                        </FormItem>
                                <Button type="primary" @click="query">查询</Button>
                            </Col>
                            <Col>
                                <Button type="primary" @click="selectall">全选</Button>
                                <Button type="primary" @click="deselectall">取消全选</Button>
                                <Button type="primary" @click="applypayment">批准付款</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Table :columns="paymentTableColumns" :data="paymentTableData"></Table>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import util from '../../../libs/util'
    export default {
        name: "paymentMng",
        data:function(){
            return{
                paymentquery:{
                    company:"",
                    staffname:"",
                    daterange:[],
                    status:""
                },
                paymentTableColumns:this.mockpaymentColumns(),
                paymentTableData:this.mockpaymentData(),

            }
        },
        methods:{
            mockpaymentColumns(){
                let data=[];
                const keyArr=['mngid','username','name','payamount','alipay','requireddate','status','note'];
                const titleArr=['管理编号','用户名','姓名','付款金额','支付宝账号','提请付款日期','状态','备注'];
                data=util.renderTableNoColumn(data);
                data=util.renderTableNormalColumn(data,keyArr,titleArr);
                console.log(data)
                return data
            },
            mockpaymentData(){
                return util.mockblankrow();
            },
            query(){

            },
            selectall(){

            },
            deselectall(){

            },
            applypayment(){

            }
        }
    }
</script>

<style scoped>

</style>