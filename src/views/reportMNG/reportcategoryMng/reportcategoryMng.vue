<template>
    <div>
                <Row>
                    <Col span="6">
                        <div style="background: #eee;padding: 10px;">
                            <Card>
                        <p slot="title">所属故障分类</p>
                        <div style="height: 400px;">
                            <Tree :data="faultTreeData" @on-select-change="refreshTable"></Tree>
                        </div>
                            </Card>
                        </div>
                    </Col>
                    <Col span="18">
                        <div style="background: #eee;padding:10px">
                            <Card>
                                <div slot="title">
                                    <Row type="flex" justify="space-between">
                                        <Col><p>故障列表</p></Col>
                                        <Col>
                                            <div>
                                                <transition>
                                                <ButtonGroup>
                                                    <Button @click="movupward">上移</Button>
                                                    <Button @click="edit">编辑</Button>
                                                    <Button @click="del">删除</Button>
                                                    <Button @click="movdownward">下移</Button>
                                                </ButtonGroup>
                                                </transition>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>
                                            <Button type="primary" @click="newData">新增</Button></div>
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <Table :columns="tablecolumns" :data="tabledata" height=400 highlight-row @on-current-change="configureItem"></Table>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
        <Modal v-model="showmodal">
            <div slot="header"><p>{{modaltitle}}</p></div>
            <Form>
                <p>所属故障分类:{{categorydata.belonging}}</p>
                <FormItem label="故障名称："><Input v-model="categorydata.name"/></FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="cancel">返回</Button>
                <Button type="primary" @click="submit">提交</Button>
            </div>
        </Modal>
        </div>
</template>

<script>
    import util from '../../../libs/util.js'
    export default {
        name: "reportcategoryMng",
        data:function(){
            return{
                showmodal:false,
                modaltitle:"",
                faultTreeData:[{title:"故障1"}],
                tablecolumns:this.mocktablecolumns(),
                tabledata:util.mockblankrow(),
                categorydata:{
                    belonging:"",
                    name:""
                }
            }
        },
        methods:{
            mocktablecolumns(){
                let data=[];
                const keyArr=['name'];
                const titleArr=['故障名称'];
                data=util.renderTableNoColumn(data);
                data=util.renderTableNormalColumn(data,keyArr,titleArr);
                return data;
            },
            refreshTable(){

            },
            configureItem(){

            },
            movupward(){

            },
            movdownward(){

            },
            edit(){

            },
            del(){

            },
            cancel(){

            },
            submit(){

            },
            newData(){

            }
        }
    }
</script>

<style scoped>

</style>