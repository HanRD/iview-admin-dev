<template>
    <div>
        <div style="padding: 10px;background: #EEE">
            <Card>
                <div>
                    <Form :model="bonusquery" inline>
                        <FormItem>
                            <Select v-model="bonusquery.company" placeholder="请选择维护公司">
                                <Option v-for="item in companylist" :value="item.value" :key="item.value">{{item.label}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Input type="text" v-model="bonusquery.username" placeholder="请输入维护人员用户名" />
                        </FormItem>
                        <FormItem>
                            <Input type="text" v-model="bonusquery.staffname" placeholder="请输入维护人员姓名"/>
                        </FormItem>
                        <FormItem>
                            <DatePicker v-model="bonusquery.daterange" type="daterange" split-panels placeholder="请选择起始结束日期"></DatePicker>
                        </FormItem>
                        <Button type="primary" @click="query">查询</Button>
                    </Form>
                    <Table :columns="bonusTableColumns" :data="bonusTableData"></Table>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import util from '../../../libs/util'
    export default {
        name: "bonusMng",
        data:function(){
            return{
                bonusquery:{
                    company:"",
                    username:"",
                    staffname:"",
                    daterange:[]
                },
                companylist:[],
                bonusTableColumns:this.mockBonusTableColumns(),
                bonusTableData:this.mockTableData()
            }
        },
        methods:{
            query(){
                console.log(this.bonusquery)
            },
            mockBonusTableColumns(){
                let data=[];
                const keyArr=[];
                const titleArr=[];
                data=util.renderTableNoColumn(data);
                data=util.renderTableNormalColumn(data,keyArr,titleArr);


            },
            mockTableData(){

            }
        }
    }
</script>

<style scoped>

</style>