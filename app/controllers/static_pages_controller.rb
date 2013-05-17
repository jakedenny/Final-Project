class StaticPagesController < ApplicationController
	def account
	end

	def cart
	end

	def index
	end

	def choose
		@order = Order.new(params[:order])
	    if @order.save
	    else
	      render "new"
	    end
	end

	def measure
	end

	def order
	end

	def install
	end

end