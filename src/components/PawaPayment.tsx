import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { PawaPayService, CAMEROON_OPERATORS, PaymentRequest } from "@/lib/pawapay";
import { Smartphone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface PawaPaymentProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const PawaPayment = ({ amount, onSuccess, onError }: PawaPaymentProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle');
  const [depositId, setDepositId] = useState<string>("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    
    // Auto-detect operator
    const operator = PawaPayService.detectOperator(value);
    if (operator) {
      setSelectedOperator(operator);
    }
  };

  const handlePayment = async () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    if (!selectedOperator) {
      toast({
        title: "Error",
        description: "Please select your mobile money operator",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('pending');

    try {
      const formattedPhone = PawaPayService.formatPhoneNumber(phoneNumber);
      
      const paymentRequest: PaymentRequest = {
        amount: amount.toString(),
        currency: "XAF", // Central African CFA Franc
        correspondent: selectedOperator,
        payer: {
          type: "MSISDN",
          address: {
            value: formattedPhone
          }
        },
        customerTimestamp: new Date().toISOString(),
        statementDescription: "IAI PROTOCOLE Registration"
      };

      const response = await PawaPayService.initiatePayment(paymentRequest);
      setDepositId(response.depositId);

      // Start polling for payment status
      pollPaymentStatus(response.depositId);

      toast({
        title: "Payment Initiated",
        description: "Please check your phone and confirm the payment",
      });

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
      setIsProcessing(false);
      
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      onError(errorMessage);
      
      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const pollPaymentStatus = async (depositId: string) => {
    const maxAttempts = 30; // 5 minutes with 10-second intervals
    let attempts = 0;

    const checkStatus = async () => {
      try {
        const status = await PawaPayService.checkPaymentStatus(depositId);
        
        if (status.status === 'COMPLETED') {
          setPaymentStatus('success');
          setIsProcessing(false);
          onSuccess();
          
          toast({
            title: "Payment Successful",
            description: "Your registration has been completed!",
          });
          return;
        }
        
        if (status.status === 'FAILED' || status.status === 'REJECTED') {
          setPaymentStatus('failed');
          setIsProcessing(false);
          onError('Payment was declined or failed');
          
          toast({
            title: "Payment Failed",
            description: "Payment was declined. Please try again.",
            variant: "destructive",
          });
          return;
        }

        // Continue polling if still pending
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 10000); // Check every 10 seconds
        } else {
          setPaymentStatus('failed');
          setIsProcessing(false);
          onError('Payment timeout - please contact support');
          
          toast({
            title: "Payment Timeout",
            description: "Payment is taking too long. Please contact support.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Status check error:', error);
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 10000);
        } else {
          setPaymentStatus('failed');
          setIsProcessing(false);
          onError('Unable to verify payment status');
        }
      }
    };

    // Start checking after 5 seconds
    setTimeout(checkStatus, 5000);
  };

  const getOperatorInfo = (operatorId: string) => {
    return CAMEROON_OPERATORS.find(op => op.id === operatorId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-display text-xl font-bold text-slate-800 mb-2">
          Mobile Money Payment
        </h3>
        <p className="text-slate-600">
          Pay securely with MTN Mobile Money or Orange Money
        </p>
      </div>

      {/* Phone Number Input */}
      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="flex items-center gap-2 text-slate-700 font-medium">
          <Smartphone className="w-4 h-4 text-red-600" />
          Phone Number *
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="6XX XX XX XX"
          value={phoneNumber}
          onChange={handlePhoneChange}
          className="bg-white border-slate-300 focus:border-red-500 focus:ring-red-500"
          disabled={isProcessing}
        />
        <p className="text-sm text-slate-500">
          Enter your mobile money number (9 digits)
        </p>
      </div>

      {/* Operator Selection */}
      <div className="space-y-3">
        <Label className="text-slate-700 font-medium">
          Select Your Operator *
        </Label>
        <div className="grid grid-cols-1 gap-3">
          {CAMEROON_OPERATORS.map((operator) => (
            <div
              key={operator.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedOperator === operator.id
                  ? 'border-red-500 bg-red-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => !isProcessing && setSelectedOperator(operator.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${operator.color} flex items-center justify-center text-white text-xl`}>
                  {operator.logo}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{operator.name}</h4>
                  <p className="text-sm text-slate-600">
                    Prefixes: {operator.prefix.join(', ')}
                  </p>
                </div>
                {selectedOperator === operator.id && (
                  <CheckCircle className="w-5 h-5 text-red-600 ml-auto" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Amount */}
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-slate-700">Amount to Pay:</span>
          <span className="font-bold text-2xl text-red-600">{amount.toLocaleString()} XAF</span>
        </div>
      </div>

      {/* Payment Status */}
      {paymentStatus !== 'idle' && (
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center gap-3">
            {paymentStatus === 'pending' && (
              <>
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <div>
                  <p className="font-medium text-slate-800">Payment in Progress</p>
                  <p className="text-sm text-slate-600">
                    Check your phone for the payment prompt
                  </p>
                </div>
              </>
            )}
            {paymentStatus === 'success' && (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Payment Successful</p>
                  <p className="text-sm text-green-600">
                    Your registration is complete!
                  </p>
                </div>
              </>
            )}
            {paymentStatus === 'failed' && (
              <>
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-800">Payment Failed</p>
                  <p className="text-sm text-red-600">
                    Please try again or contact support
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Payment Button */}
      <Button
        onClick={handlePayment}
        disabled={!phoneNumber || !selectedOperator || isProcessing}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 text-lg shadow-soft hover:shadow-elevated transition-all duration-300"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Smartphone className="w-5 h-5 mr-2" />
            Pay {amount.toLocaleString()} XAF
          </>
        )}
      </Button>

      {selectedOperator && (
        <div className="text-center text-sm text-slate-600">
          <p>
            You will receive a payment prompt on your{" "}
            <span className="font-medium text-slate-800">
              {getOperatorInfo(selectedOperator)?.name}
            </span>{" "}
            number
          </p>
        </div>
      )}
    </div>
  );
};

export default PawaPayment;