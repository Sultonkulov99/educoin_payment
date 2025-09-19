import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymeRequest } from '../types/payments/payme';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/create-payment.dto';

// @ApiExcludeController(true)
@ApiTags('Payment')
@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('api/payment/checkout')
  createPayment(@Body() payload: CreatePaymentDto, @Req() req: any) {
    return this.paymentsService.createPayment(payload);
  }

  @ApiExcludeEndpoint()
  @Post('payment/payme/gateway')
  paymeRequest(
    @Body() payload: PaymeRequest,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.paymentsService.handlePaymeRequest(payload, req, res);
  }

  // TODO: Will be removed
  @ApiExcludeEndpoint()
  @Get('payment/delete-transactions')
  deleteAllTransactions() {
    return this.paymentsService.deleteTransactions();
  }
}
