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
	    	# redirect_to measure_path(:order_id => @order.id)
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