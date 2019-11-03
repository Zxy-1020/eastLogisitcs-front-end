<style>
	.ivu-table td, .ivu-table-border td{
		height: 41px;
	}
</style>
<template>
	<div>
		<div class="rigtop">
			<Form ref="report" inline>
				<FormItem style="position: relative;left: 10px">
					<!-- <Button @click="changePage(1)">
						<Icon type="ios-sync" />快速查询
					</Button> -->
				</FormItem>
				<FormItem style="position: absolute;right: 30px">
					<FormItem>
						<Button @click="add()">
							<Icon type="ios-add-circle-outline" />添加记录
						</Button>
					</FormItem>
					<Button @click="exportData()">
						<Icon type="ios-download-outline" />数据导出
					</Button>
				</FormItem>
			</Form>
		</div>



		<Table border :columns="columns7" :data="data6" height="450" :loading="loading" stripe size='default' ref="table"></Table>
		<div style="margin: 10px;overflow: hidden">
			<div style="float: right;">
				<Page :total="count" :current="1" @on-change="changePage($event)"></Page>
			</div>
		</div>
		<Modal v-model="modal14" :loading="modal14loading" scrollable :title="title" @on-ok="addok">
			<Form ref="formValidate" :model="report" :label-width="80">
				<FormItem label="客户编号" prop="cId">
					<Input v-model="report.cId" placeholder="请输入客户编号"></Input>
				</FormItem>
				<FormItem label="业务员编号" prop="sId">
					<Input  v-model="report.sId" :maxlength=6 placeholder="请输入业务员编号"></Input>
				</FormItem>
				<FormItem label="名称" prop="rName">
					<Input v-model="report.rName" :maxlength=20 placeholder="请输入名称"></Input>
				</FormItem>
				<FormItem label="统计时间" prop="rStatisticstime">
									<Input v-model="report.rStatisticstime" :maxlength=20 placeholder="请输入统计时间"></Input>
				</FormItem>
				<FormItem label="生成时间" prop="rCreatetime">
					<Input v-model="report.rCreatetime" :maxlength=20  placeholder="请输入生成时间"></Input>
				</FormItem>
				<FormItem label="金额" prop="rMoney">
					<Input v-model="report.sPhone" :maxlength=11 placeholder="请输入金额"></Input>
				</FormItem>
				<FormItem label="结算状态" prop="rStatus">
					<Input v-model="report.sIn" :maxlength=10  placeholder="请输入结算状态"></Input>
				</FormItem>
			</Form>
		</Modal>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				sPhones:false,
				rNames:false,
				modal14: false,
				loading: true,
				modal14loading: true,
				title:'添加报表',

				url: "http://localhost:8080",
				count: 10,
				report: {
					rId: 0,
					rName: '',
					sId: '',
					cId: '',
					rStatisticstime: '',
					rCreatetime: '',
					rMoney: '',
					rStatus: ''
				},
				columns7: [{
						title: '编号',
						key: 'rId',
						align: 'center',
						width: 100
					},
					{
						title: '名称',
						key: 'rName',
						align: 'center'
					},
					{
						title: '业务员编号',
						key: 'sId',
						align: 'center'
					},

					{
						title: '客户编号',
						key: 'cId',
						align: 'center'
					},
					{
						title: '统计时间',
						key: 'rStatisticstime',
						align: 'center'
					},
					{
						title: '金额',
						key: 'rMoney',
						align: 'center'
					},
					{
						title: '结算状态',
						key: 'rStatus',
						align: 'center'
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {

											this.show(params.row)
										}
									}
								}, '编辑'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {

											this.remove(params.row.rId)
										}
									}
								}, '移除')
							]);
						}
					}
				],
				data6: []
			}
		},
		methods: {
			//单击添加
			add() {
				this.title = "添加报表";
				this.report.rName = "";
				this.report.sId = "";
				this.report.cId = "";
				this.report.rStatisticstime= "";
				this.report.rCreatetime = "";
				this.report.rMoney= "";
				this.report.rStatus = "";
				this.modal14 = true;
			},
			//单击编辑
			show(data){
				this.title = '编辑报表';
				this.modal14 = true;
				this.report.rId = data.rId;
				this.report.rName = data.rName;
				this.report.sId = data.sId;
				this.report.cId = data.cId;
				this.report.rStatisticstime = data.rStatisticstime;
				this.report.rCreatetime = data.rCreatetime;
				this.report.rMoney = data.rMoney;
				this.report.rStatus = data.rStatus;
				this.modal14 = true;
			},
			//弹出添加保存
			addok() {
				if (this.report.rName.length < 1) {
					this.$Message.warning('请输入名字!');
					this.modal14show();
					return;
				}

				const th = this;
				var urls = "insert";
				if(this.title == "编辑报表"){
					urls = "updateByPrimaryKey";
				}
				axios.post(th.url + '/report/'+urls, th.report, {
					headers: {
						"Content-Type": "application/json;charset=utf-8"
					}
				}).then(function(res) {
					if (res.data.code === 200) {
						th.$Message.success(res.data.message);
						th.modal14 = false;
						th.changePage(1);
					} else {
							th.modal14show();
						th.$Message.error(res.data.message);
					}
				})


			},
			modal14show() {
				this.modal14 = false;
				setTimeout(() => {
					this.modal14 = true;
				}, 0);
			},
			//删除操作
			remove(id){
				this.$Modal.confirm({
					title: '删除提示',
					content: '<p>移除后不可恢复，确定继续？</p>',
					onOk: () => {
						const th = this;
						axios.get(th.url + '/report/deleteByPrimaryKey', {
							params: {
								id: id
							}
						}).then(function(res) {
							if (res.data.code === 200) {
								th.$Message.success(res.data.message);
								th.changePage(1);
							} else {
								th.$Message.error(res.data.message);
							}
						})
					}
				});
			},
			//导出数据
			exportData() {
				this.$refs.table.exportCsv({
					filename: '报表信息'
				});
			},
				//查询
			changePage(page) {
				const th = this;
				console.log(th.url);
				axios.get(th.url + '/report/selectPage', {
					params: {
						page: page
					}
				}).then(function(res) {
					th.data6 = res.data.data;
					th.count = res.data.count;
				})
				th.loading = false;
			},
		},
		created() {
			this.changePage(1);
		}
}
</script>
